// src/components/lib/actions.ts
"use server";

import supabase from '@/components/lib/db';
import { revalidatePath } from "next/cache";

// --- FUNGSI 1: MENCARI DATA DETAIL PANAH (Penting untuk QR Scan) ---
export async function getPanahDetail(panahId: number) {
  // Mencari data panah berdasarkan panah_id (101, 102, dst)
  const { data: dataPanah, error } = await supabase
    .from('panah')
    .select(`
      panah_id,
      nama_panah,
      profile_id,
      profiles:profile_id (
        name
      )
    `)
    .eq('panah_id', panahId)
    .single();

  if (error || !dataPanah) {
    return { success: false, message: `Panah ID ${panahId} tidak ditemukan.` };
  }

  // OPTIONAL: Mencari bandul_id dari tabel registrasi_lomba jika ada relasinya
  // Untuk saat ini kita return 0 atau null jika tidak ditemukan, nanti di Page bisa dihandle
  let bandulId = 0; 
  const { data: regData } = await supabase
    .from('registrasi_lomba')
    .select('bandul_id')
    .eq('profile_id', dataPanah.profile_id)
    .single();
  
  if (regData) {
    bandulId = regData.bandul_id;
  }

  return { 
    success: true, 
    data: {
      panahId: dataPanah.panah_id,
      // @ts-ignore
      nama: dataPanah.profiles?.name || "Tanpa Nama",
      nomor: dataPanah.nama_panah,
      bandul: bandulId // Ini penting untuk tabel skor_panah
    }
  };
}

// --- FUNGSI 2: INPUT SKOR KE TABEL SKOR_PANAH (Support Manual & Auto) ---
type AddScoreParams = {
  lombaId: number;       // ID Lomba yang sedang berlangsung
  panahIdentifier: number; // ID Panah (101)
  skor: number;          // Nilai (3 atau 1)
  bandulId: number;      // ID Bandul (5, 6, dst)
};

export async function addScore({ 
  lombaId, 
  panahIdentifier, 
  skor, 
  bandulId 
}: AddScoreParams) {
  
  // 1. Cari Rambahan (Ronde) yang sedang AKTIF
  // Kita cari rambahan di lomba ini yang 'finish_time' nya masih kosong (belum selesai)
  const { data: activeRound, error: errorRound } = await supabase
    .from('rambahan')
    .select('rambahan_id')
    .eq('lomba_id', lombaId)
    .is('finish_time', null)
    .single();

  if (errorRound || !activeRound) {
    return { success: false, message: "Gagal: Tidak ada ronde aktif untuk lomba ini (Admin belum mulai ronde)." };
  }

  try {
    // Cek apakah data sudah ada sebelumnya (untuk memberi feedback UPDATE vs INSERT)
    const { data: existingScore } = await supabase
      .from('skor_panah')
      .select('skor')
      .eq('rambahan_id', activeRound.rambahan_id)
      .eq('panah_id', panahIdentifier)
      .single();

    const actionType = existingScore ? 'UPDATE' : 'INSERT';

    // 2. UPSERT ke tabel 'skor_panah'
    // Gunakan .upsert() agar jika data sudah ada, dia akan melakukan UPDATE
    const { error } = await supabase
      .from('skor_panah')
      .upsert(
        {
          rambahan_id: activeRound.rambahan_id,
          panah_id: panahIdentifier,
          bandul_id: bandulId,
          skor: skor
        },
        // Penting: Pastikan 'onConflict' sesuai dengan Primary Key tabel Anda (biasanya composite key rambahan_id + panah_id)
        { onConflict: 'rambahan_id, panah_id' }
      );

    if (error) throw error;

    revalidatePath(`/lomba/${lombaId}`);
    
    return { 
      success: true, 
      type: actionType, 
      message: actionType === 'UPDATE' ? "Data berhasil diperbarui." : "Data berhasil disimpan." 
    };

  } catch (error: any) {
    console.error("Error addScore:", error);
    // Logging error asli berguna untuk debugging manual maupun otomatis
    // console.error("❌ ERROR ASLI DARI SUPABASE:", JSON.stringify(error, null, 2));
    return { success: false, message: "Gagal menyimpan ke database. Cek koneksi atau izin akses." };
  }
}