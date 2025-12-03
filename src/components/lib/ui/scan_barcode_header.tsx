"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

// Optional: Define props interface if using TypeScript
interface Props {
  onBackClick?: () => void;
}

export default function ScanBarcodeHeader({ onBackClick }: Props) {
  const router = useRouter();

  // Handle the click logic
  const handleBack = () => {
    if (onBackClick) {
      // If a custom function is passed, run it
      onBackClick();
    } else {
      // Otherwise, do the default behavior
      router.back();
    }
  };

  return (
    <div
      className="bg-[#AE6924] rounded-[20px] flex items-center"
      style={{ width: 346, height: 84 }}
    >
      <div
        onClick={handleBack} // Updated to use our handler
        className="bg-white rounded-full flex items-center justify-center cursor-pointer"
        style={{
          width: 33,
          height: 33,
          marginLeft: 20,
        }}
      >
        <Image
          src="/chevron-left.svg"
          alt="Arrow Left"
          width={20}
          height={20}
        />
      </div>

      <span
        className="font-Poppins"
        style={{
          fontWeight: 600,
          fontSize: 26,
          lineHeight: "100%",
          letterSpacing: "0%",
          color: "#FFFFFF",
          paddingLeft: 60,
        }}
      >
        Scan Barcode
      </span>
    </div>
  );
}