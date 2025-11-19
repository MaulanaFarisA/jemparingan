"use client";

import { addScore } from "@/components/lib/actions";

export default function TestPage() {
  
  const runTest = async () => {
    console.log("Memulai test...");
    
    const result = await addScore({
      lombaId: 1,
      panahIdentifier: 101,
      skor: 1,
      bandulId: 5
    });

    if (result.success) {
      alert("BERHASIL! cek perubahan tabel skor_panah di supabase.");
    } else {
      alert("GAGAL: " + result.message);
    }
  };

  return (
    <div className="p-10">
      <h1>Halaman Test Skoring</h1>
      <button 
        onClick={runTest}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
      >
        TEST SKOR 1
      </button>
    </div>
  );
}