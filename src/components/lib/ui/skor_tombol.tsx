// src/components/lib/ui/skor_tombol.tsx
"use client";

interface SkorTombolProps {
  value: number | null;            // Nilai skor saat ini (dari parent)
  onChange: (val: number | null) => void; // Fungsi untuk mengubah nilai
  disabled?: boolean;              // Opsi untuk mematikan tombol (fitur dari manual)
}

export default function SkorTombol({ value, onChange, disabled = false }: SkorTombolProps) {
  
  // Fungsi helper untuk menangani klik
  const handleBoxClick = (skor: number) => {
    if (disabled) return;

    // Logika Toggle (Unselect jika diklik lagi) - Penting untuk koreksi
    if (value === skor) {
      onChange(null);
    } else {
      onChange(skor);
    }
  };

  return (
    <div className="flex gap-[56px]">
      {/* Box 1 (Value 3 - Merah) */}
      <div
        onClick={() => handleBoxClick(3)}
        className={`bg-[#AE2424] rounded-[17px] flex items-center justify-center  ${
          disabled 
            // ? "opacity-50 cursor-not-allowed" 
            // : "cursor-pointer hover:scale-105 active:scale-95"
        }`}
        style={{
          width: 130,
          height: 130,
          // Border kuning jika dipilih, merah tua jika tidak
          border: value === 3 ? "10px solid #FFEE00" : "5px solid #921D1D",
          // Efek mengecil sedikit saat dipilih agar responsif
          transform: value === 3 ? "scale(0.99)" : "scale(1)",
        }}
      >
        <span
          className="font-Poppins"
          style={{
            fontWeight: 700,
            fontSize: 72,
            color: "#FFFFFF",
          }}
        >
          3
        </span>
      </div>

      {/* Box 2 (Value 1 - Putih) */}
      <div
        onClick={() => handleBoxClick(1)}
        className={`bg-white rounded-[17px] flex items-center justify-center  ${
          disabled 
            // ? "opacity-50 cursor-not-allowed" 
            // : "cursor-pointer hover:scale-105 active:scale-95"
        }`}
        style={{
          width: 130,
          height: 130,
          // Border kuning jika dipilih, abu-abu jika tidak
          border: value === 1 ? "10px solid #FFEE00" : "5px solid #E1E1E1",
          transform: value === 1 ? "scale(0.99)" : "scale(1)",
        }}
      >
        <span
          className="font-Poppins"
          style={{
            fontWeight: 700,
            fontSize: 72,
            color: "#000000",
          }}
        >
          1
        </span>
      </div>
    </div>
  );
}