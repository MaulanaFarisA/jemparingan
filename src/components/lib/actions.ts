"use server";

import supabase from '@/components/lib/db';
import { revalidatePath } from "next/cache";

type AddScoreParams = {
  lombaId: number;
  panahIdentifier: number;
  skor: number;
  bandulId?: number;
};

export async function addScore({ lombaId, panahIdentifier, skor, bandulId }: AddScoreParams) {
  
  const { data: activeRound } = await supabase
    .from('rambahan')
    .select('rambahan_id')
    .eq('lomba_id', lombaId)
    .is('finish_time', null)
    .single();

  if (!activeRound) {
    return { success: false, message: "Ronde belum dimulai oleh Admin." };
  }

  try {
    const { data: existingScore } = await supabase
      .from('skor_panah')
      .select('skor')
      .eq('rambahan_id', activeRound.rambahan_id)
      .eq('panah_id', panahIdentifier)
      .single();

    const actionType = existingScore ? 'UPDATE' : 'INSERT';

    const { error } = await supabase
      .from('skor_panah')
      .upsert(
        {
          rambahan_id: activeRound.rambahan_id,
          panah_id: panahIdentifier,
          skor: skor,
          bandul_id: bandulId
        },
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
    console.error("❌ ERROR ASLI DARI SUPABASE:", JSON.stringify(error, null, 2));
    return { success: false, message: "Gagal menyimpan ke database. Cek koneksi / RLS." };
  }
}