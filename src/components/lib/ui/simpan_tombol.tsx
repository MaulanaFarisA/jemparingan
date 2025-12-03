// SimpanTombol.tsx
interface SimpanTombolProps {
  disabled?: boolean;
}

export default function SimpanTombol({ disabled = false }: SimpanTombolProps) {
  return (
    <div
      className={`bg-[#58A700] rounded-[17px] flex items-center justify-center ${
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
      }`}
      style={{ width: 169, height: 53 }}
    >
      <span
        className="font-Poppins font-bold text-[24px] leading-[100%] tracking-[7%] text-white"
      >
        SIMPAN
      </span>
    </div>
  );
}
