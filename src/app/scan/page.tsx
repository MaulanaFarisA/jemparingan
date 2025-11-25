
  "use client";

  import { useState } from "react";
  import QRScanner from "@/components/lib/ui/qrscanner";
  import { Button } from "@/components/lib/ui/button";
  import Link from "next/dist/client/link";
  import ScanBarcodeHeader from "@/components/lib/ui/scan_barcode_header";


  interface QRData {
    nama: string;
    panah: string;
    bandul: number;
  }

  export default function ScanPage() {
    const [data, setData] = useState<QRData | null>(null);
    const [scores, setScores] = useState<number[]>([]);
    const [showScanner, setShowScanner] = useState(true);

    const handleScanResult = (result: QRData) => {
      setData(result);
      setScores([]);
      setShowScanner(false);
    };

    const resetScanner = () => {
      setData(null);
      setScores([]);
      setShowScanner(true);
    };

    return (
      <div className="flex flex-col items-center p-4 gap-4 my-10 min-h-screen w-full">
      <ScanBarcodeHeader />
        {/* SCANNER */}
        {showScanner && (
          <QRScanner onResult={handleScanResult} />
        )}

        {/* HASIL SCAN */}
        {!showScanner && data && (
          <div className="w-full max-w-md bg-white p-5 rounded-xl shadow">

            <h2 className="text-lg font-bold text-center mb-3">{data.nama}</h2>

            <p className="text-4xl font-extrabold text-blue-600 text-center mb-2">
              {data.panah}
            </p>

            <p className="text-lg font-semibold text-center mb-4">
              Bandul {data.bandul}
            </p>

            {/* PENILAIAN */}
            <div className="grid grid-cols-5 gap-2 mb-4">
              {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                <button
                  key={num}
                  onClick={() => setScores((s) => [...s, num])}
                  className="bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600"
                >
                  {num}
                </button>
              ))}
            </div>

            {/* RIWAYAT */}
            {scores.length > 0 && (
              <p className="text-center text-lg mb-4">
                <span className="font-semibold">Riwayat skor:</span> {scores.join(", ")}
              </p>
            )}

            <button
              onClick={resetScanner}
              className="w-full bg-gray-200 py-2 rounded-lg font-semibold hover:bg-gray-300"
            >
              Scan Lagi
            </button>
          </div>
        )}
        <Link href="/scan/manual">
          <Button className="px-11 py-4 !hover:bg-[#321008] text-sm mt-3 rounded-2xl w-50 h-14">
            Input Manual
          </Button>
        </Link>
      </div>
    );
  }
