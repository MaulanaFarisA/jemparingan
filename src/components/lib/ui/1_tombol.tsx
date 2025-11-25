"use client";
import { useState } from "react";

export default function SatuTombol() {
  const [clicked, setClicked] = useState(false);

  return (
    <div
      onClick={() => setClicked(!clicked)}
      className="bg-[#FFFFFF] rounded-[17px] flex items-center justify-center cursor-pointer"
      style={{
        width: 130,
        height: 130,
        border: clicked ? "10px solid #FFEE00" : "5px solid #E1E1E1",
      }}
    >
      <span
        className="font-Poppins flex justify-center w-full"
        style={{
          fontWeight: 700,
          fontSize: 72,
          lineHeight: "100%",
          letterSpacing: "0%",
          color: "#000000",
        }}
      >
        1
      </span>
    </div>
  );
}
