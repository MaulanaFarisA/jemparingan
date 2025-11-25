import Image from "next/image";

export default function SimpanTombol() {
  return (
    <div className="bg-[#58A700] rounded-[17px] flex items-center" style={{ width: 169, height: 53 }}>
      <span
        className="font-Poppins flex justify-center w-full"
        style={{
          fontWeight: 700,
          fontSize: 24,
          lineHeight: "100%",
          letterSpacing: "7%",
          color: "#FFFFFF",
        }}
      >
        SIMPAN
      </span>
    </div>
  );
}
