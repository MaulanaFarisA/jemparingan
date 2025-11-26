"use client";
import { useState } from "react";

interface TombolProps {
  onClick?: () => void;
  disabled?: boolean;
}

export default function SatuTombol({ onClick, disabled }: TombolProps) {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    if (disabled) return;
    setClicked(!clicked);
    if (onClick) onClick();
    
    setTimeout(() => setClicked(false), 200);
  };

  return (
    <div
      onClick={handleClick}
      className={`bg-[#FFFFFF] rounded-[17px] flex items-center justify-center cursor-pointer transition-all ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      style={{
        width: 130,
        height: 130,
        border: clicked ? "10px solid #FFEE00" : "5px solid #E1E1E1",
        transform: clicked ? "scale(0.95)" : "scale(1)",
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