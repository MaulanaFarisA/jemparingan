"use client";

import dynamic from "next/dynamic";

const Scanner = dynamic(
  () => import("@yudiel/react-qr-scanner").then(m => m.Scanner),
  { ssr: false }
);

interface QRData {
  nama: string;
  panah: string;
  bandul: number;
}

interface DetectedCode {
  rawValue: string;
  format: string;
}

export default function QRScanner({ onResult }: { onResult: (data: QRData) => void }) {
  const handleScan = (detectedCodes: DetectedCode[]) => {
    if (!detectedCodes || detectedCodes.length === 0) return;

    const raw = detectedCodes[0].rawValue;

    try {
      const json: QRData = JSON.parse(raw);
      onResult(json);
    } catch (err) {
      console.error("QR bukan JSON valid:", err);
    }
  };

  return (
    <div className="w-[300px] h-[500px] rounded-xl overflow-hidden shadow-lg bg-gradient-to-b from-[#434343] to-[#242424]">
      <Scanner
        onScan={handleScan}
        onError={(err: unknown) => console.error(err)}
        constraints={{ facingMode: "environment" }}
        scanDelay={300}
        components={{
          torch: true,
          zoom: true,

          // Menghilangkan finder merah
          finder: false,
        }}
      />
    </div>
  );
}
