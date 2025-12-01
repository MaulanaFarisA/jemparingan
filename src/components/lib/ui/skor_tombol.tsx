// src/components/lib/ui/skor_tombol.tsx
"use client";

// Tambahkan interface ini agar tidak error "IntrinsicAttributes"
interface SkorTombolProps {
  value: number | null;
  onChange: (val: number | null) => void;
}

export default function SkorTombol({ value, onChange }: SkorTombolProps) {
  // Hapus useState internal, kita pakai 'value' dari props

  const toggleBox = (boxNumber: number) => {
    // Jika kotak yang sama diklik lagi -> unselect (jadi null)
    if (value === boxNumber) {
      onChange(null);
    } else {
      // Jika kotak berbeda diklik -> pilih nilai tersebut
      onChange(boxNumber);
    }
  };

  return (
    <div className="flex gap-[56px]">
      {/* Box 1 (value 3) */}
      <div
        onClick={() => toggleBox(3)}
        className="bg-[#AE2424] rounded-[17px] flex items-center justify-center cursor-pointer"
        style={{
          width: 130,
          height: 130,
          // Ubah 'active' menjadi 'value'
          border: value === 3 ? "10px solid #FFEE00" : "5px solid #921D1D",
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

      {/* Box 2 (value 1) */}
      <div
        onClick={() => toggleBox(1)}
        className="bg-white rounded-[17px] flex items-center justify-center cursor-pointer"
        style={{
          width: 130,
          height: 130,
          // Ubah 'active' menjadi 'value'
          border: value === 1 ? "10px solid #FFEE00" : "5px solid #E1E1E1",
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