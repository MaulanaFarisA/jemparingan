// src/components/lib/ui/qrscanner.tsx
"use client";

import dynamic from "next/dynamic";

const Scanner = dynamic(
  () => import("@yudiel/react-qr-scanner").then(m => m.Scanner),
  { ssr: false }
);

interface DetectedCode {
  rawValue: string;
  format: string;
}

// Ubah prop onResult menerima string
export default function QRScanner({ onResult }: { onResult: (code: string) => void }) {
  const handleScan = (detectedCodes: DetectedCode[]) => {
    if (!detectedCodes || detectedCodes.length === 0) return;

    const raw = detectedCodes[0].rawValue;
    // Langsung kirim raw value ("101") ke parent
    onResult(raw);
  };

  return (
    <div className="w-[346px] h-[611px] rounded-xl overflow-hidden shadow-lg bg-gradient-to-b from-[#434343] to-[#242424]">
      <Scanner
        onScan={handleScan}
        onError={(err: unknown) => console.error(err)}
        constraints={{ facingMode: "environment" }}
        scanDelay={500} // Sedikit diperlambat agar tidak double scan
        components={{
          torch: true,
          zoom: true,
          finder: false,
        }}
      />
    </div>
  );
}