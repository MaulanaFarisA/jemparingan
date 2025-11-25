"use client";
import { useState } from "react";

export default function TigaTombol() {
  const [clicked, setClicked] = useState(false);

  return (
    <div
      onClick={() => setClicked(!clicked)}
      className="bg-[#AE2424] rounded-[17px] flex items-center justify-center cursor-pointer"
      style={{
        width: 130,
        height: 130,
        border: clicked ? "10px solid #FFEE00" : "5px solid #921D1D",
      }}
    >
      <span
        className="font-Poppins flex justify-center w-full"
        style={{
          fontWeight: 700,
          fontSize: 72,
          lineHeight: "100%",
          letterSpacing: "0%",
          color: "#FFFFFF",
        }}
      >
        3
      </span>
    </div>
  );
}
