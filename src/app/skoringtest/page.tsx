"use client"; // Karena butuh onClick

import { addScore } from "@/components/lib/actions"; // Import fungsi buatanmu

export default function TestPage() {
  
  const runTest = async () => {
    console.log("Memulai test...");
    
    // Panggil fungsi backendmu dengan DATA PALSU (Hardcoded)
    const result = await addScore({
      lombaId: 1,           // Sesuai data pancingan A
      panahIdentifier: 101, // Sesuai data pancingan A
      skor: 3,
      bandulId: 5
    });

    if (result.success) {
      alert("✅ BERHASIL! Cek tabel skor_panah di Supabase sekarang.");
    } else {
      alert("❌ GAGAL: " + result.message);
    }
  };

  return (
    <div className="p-10">
      <h1>Halaman Test Backend</h1>
      <button 
        onClick={runTest}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
      >
        Tes Kirim Skor 3
      </button>
    </div>
  );
}