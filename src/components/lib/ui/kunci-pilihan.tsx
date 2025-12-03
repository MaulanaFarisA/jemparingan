"use client";

import FloatingNav from "@/components/lib/ui/FloatingNav";
import NavButton from "@/components/lib/ui/NavButton";
import { useState } from "react";

interface SimpanTombolProps {
  disabled?: boolean;
  onClick?: () => void;
}

function SimpanTombol({ disabled = false, onClick }: SimpanTombolProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full h-14 rounded-[17px] flex items-center justify-center font-Poppins font-bold text-[24px] leading-[100%] tracking-[7%] text-white transition-all duration-200 ${
        disabled
          ? "bg-[#58A700]/50 cursor-not-allowed"
          : "bg-[#58A700] hover:bg-[#4E9700] cursor-pointer"
      }`}
    >
      SIMPAN
    </button>
  );
}

export default function KunciPilihan() {
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSave = () => {
    setLoading(true);
    // Simulasi save ke database
    setTimeout(() => {
      alert("Tersimpan!");
      setLoading(false);
    }, 1000);
  };

  return (
    <div
      className="flex flex-col items-start p-6 bg-[#E4E4E4] border-t-[5px] border-[#AE6924]"
      style={{ width: 401, height: 279 }}
    >
      {/* Checkbox + Label */}
      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          className="w-6 h-6 accent-[#3b3b3b] rounded"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)} />
        <span className="text-lg font-semibold text-[#505050]">
          Kunci Pilihan
        </span>
      </label>

      {/* Tombol Simpan dengan margin-top 44px */}
      <div className="mt-11 w-full">
        <SimpanTombol
          disabled={!checked || loading}
          onClick={handleSave} />
      </div>
    </div>
  );
}
