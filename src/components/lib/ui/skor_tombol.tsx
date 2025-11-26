"use client";

interface SkorTombolProps {
  selectedSkor: number | null;
  onSelect: (skor: number) => void;
  disabled?: boolean;
}

export default function SkorTombol({ selectedSkor, onSelect, disabled = false }: SkorTombolProps) {
  
  // Fungsi helper untuk menangani klik
  const handleBoxClick = (skor: number) => {
    if (disabled) return;
    onSelect(skor);
  };

  return (
    <div className="flex gap-[56px]">
      {/* Box 1 (Value 3 - Merah) */}
      <div
        onClick={() => handleBoxClick(3)}
        className={`bg-[#AE2424] rounded-[17px] flex items-center justify-center transition-all ${
          disabled ? "cursor-not-allowed opacity-70" : "cursor-pointer"
        }`}
        style={{
          width: 130,
          height: 130,
          // Cek apakah skor yang dipilih adalah 3
          border: selectedSkor === 3 ? "10px solid #FFEE00" : "5px solid #921D1D",
          transform: selectedSkor === 3 ? "scale(0.95)" : "scale(1)",
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
        className={`bg-white rounded-[17px] flex items-center justify-center transition-all ${
          disabled ? "cursor-not-allowed opacity-70" : "cursor-pointer"
        }`}
        style={{
          width: 130,
          height: 130,
          // Cek apakah skor yang dipilih adalah 1
          border: selectedSkor === 1 ? "10px solid #FFEE00" : "5px solid #E1E1E1",
          transform: selectedSkor === 1 ? "scale(0.95)" : "scale(1)",
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