// src/app/scan/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/lib/ui/button";
import ScanBarcodeHeader from "@/components/lib/ui/scan_barcode_header";
import QRScanner from "@/components/lib/ui/qrscanner";
import SkorTombol from "@/components/lib/ui/skor_tombol";
import { addScore, getPanahDetail } from "@/components/lib/actions";

interface PanahData {
  panahId: number;
  nama: string;
  bandul: number;
  nomor: string;
}

export default function ScanPage() {
  // State Management (Dari Backend Work)
  const [scannedData, setScannedData] = useState<PanahData | null>(null);
  const [showScanner, setShowScanner] = useState(true);
  const [skor, setSkor] = useState<number | null>(null);
  const [isLocked, setIsLocked] = useState(false);
  const [loading, setLoading] = useState(false);

  // --- 1. HANDLE HASIL SCAN (Logic Backend) ---
  const handleScanResult = async (rawCode: string) => {
    setShowScanner(false); 
    setLoading(true);

    try {
      // Validasi URL (agar tidak crash jika kena dynamic QR)
      if (rawCode.includes("http") || rawCode.includes("://")) {
        throw new Error("QR Code salah (Link). Gunakan QR Static berisi angka ID.");
      }

      // Bersihkan input & parse ke angka
      const cleanCode = rawCode.replace(/\D/g, ""); // Hapus karakter non-angka
      const panahId = parseInt(cleanCode);

      if (isNaN(panahId) || !cleanCode) {
        throw new Error("QR Code tidak terbaca sebagai angka ID.");
      }

      // Ambil detail data dari database (Nama & Bandul)
      const result = await getPanahDetail(panahId);
      
      if (result.success && result.data) {
        setScannedData(result.data);
      } else {
        alert(result.message);
        setShowScanner(true);
      }

    } catch (error: any) {
      console.error(error);
      alert(error.message);
      setShowScanner(true);
    } finally {
      setLoading(false);
    }
  };

  // --- 2. HANDLE SIMPAN SKOR (Logic Backend) ---
  const handleSave = async () => {
    if (!scannedData || skor === null) return;
    setLoading(true);

    try {
      const res = await addScore({
        lombaId: 1, // HARDCODE SEMENTARA (Sesuai Logic Backend)
        panahIdentifier: scannedData.panahId,
        bandulId: scannedData.bandul,
        skor: skor,
      });

      if (res.success) {
        alert("✅ " + res.message);
        resetState();
      } else {
        alert("❌ Gagal: " + res.message);
      }
    } catch (e) {
      alert("Terjadi kesalahan sistem");
    } finally {
      setLoading(false);
    }
  };

  const resetState = () => {
    setScannedData(null);
    setSkor(null);
    setIsLocked(false);
    setShowScanner(true);
  };

  return (
    <div className="flex flex-col items-center p-4 gap-4 my-10 min-h-screen w-full">
      <ScanBarcodeHeader onBackClick={resetState} />

      {/* Loading Indicator */}
      {loading && !scannedData && (
        <div className="text-white font-semibold animate-pulse">Memuat Data...</div>
      )}

      {/* SCANNER */}
      {showScanner && !loading && (
        <QRScanner onResult={handleScanResult} />
      )}

      {/* HASIL SCAN (UI Menggunakan Style Teman Frontend) */}
      {!showScanner && scannedData && (
        <div className="w-full max-w-md bg-white p-5 rounded-xl shadow mb-6">
          
          {/* Typography Style Teman (Besar & Bold) */}
          <h2 className="text-2xl font-semibold text-center mb-3 text-black">
            {scannedData.nama}
          </h2>

          <p className="text-6xl font-semibold text-black text-center">
            {scannedData.nomor}
          </p>

          <p className="text-4xl font-semibold text-black text-center mb-4">
            Bandul {scannedData.bandul}
          </p>

          {/* INPUT SKOR (Diperlukan Backend) */}
          <div className="flex justify-center mb-6">
            <SkorTombol value={skor} onChange={setSkor} disabled={isLocked} />
          </div>

          {/* IMPLEMENTASI KUNCI PILIHAN (Logic Backend + UI Style) */}
          <div className="flex flex-col items-start p-6 bg-[#E4E4E4] border-t-[5px] border-[#AE6924]">
            <label className="flex items-center gap-3 cursor-pointer mb-6 select-none w-full">
              <input
                type="checkbox"
                className="w-6 h-6 accent-[#3b3b3b] rounded cursor-pointer"
                checked={isLocked}
                onChange={(e) => setIsLocked(e.target.checked)}
              />
              <span className="text-lg font-semibold text-[#505050]">
                Kunci Pilihan
              </span>
            </label>

            <button
              onClick={handleSave}
              disabled={!isLocked || skor === null || loading}
              className={`w-full h-14 rounded-[17px] flex items-center justify-center font-bold text-[24px] text-white transition-all 
                ${(!isLocked || skor === null || loading) 
                  ? "bg-[#58A700]/50 cursor-not-allowed" 
                  : "bg-[#58A700] hover:bg-[#4E9700] active:scale-95"
                }`}
            >
              {loading ? "Menyimpan..." : "SIMPAN"}
            </button>

            {/* <button 
              onClick={resetState}
              className="w-full mt-4 text-red-500 font-medium text-sm hover:underline text-center"
            >
              Batal / Scan Ulang
            </button> */}
          </div>
        </div>
      )}

      {/* Tombol Manual (UI Teman) */}
      <Link href="/scan/manual">
        <Button className="px-11 py-4 !hover:bg-[#321008] text-sm mt-3 rounded-2xl w-50 h-14">
          Input Manual
        </Button>
      </Link>
    </div>
  );
}