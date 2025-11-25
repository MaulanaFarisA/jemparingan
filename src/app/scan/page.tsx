
  "use client";

  import { useState } from "react";
  import QRScanner from "@/components/lib/ui/qrscanner";
  import { Button } from "@/components/lib/ui/button";
  import Link from "next/dist/client/link";
  import ScanBarcodeHeader from "@/components/lib/ui/scan_barcode_header";
  import KunciPilihan from "@/components/lib/ui/kunci-pilihan";


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
          <div className="w-full max-w-md bg-white p-5 rounded-xl shadow mb-6">

            <h2 className="text-2xl font-semibold text-center mb-3">{data.nama}</h2>

            <p className="text-6xl font-semibold text-black text-center">
              {data.panah}
            </p>

            <p className="text-4xl font-semibold text-black text-center mb-4">
              Bandul {data.bandul}
            </p>

            <div>
              <KunciPilihan />
            </div>
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