"use client";
import { useState } from "react";

export default function SkorTombol({
  value,
  onChange,
}: {
  value: number | null;
  onChange: (val: number | null) => void;
}) {
  const toggleBox = (boxNumber: number) => {
    if (value === boxNumber) {
      onChange(null);
    } else {
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
