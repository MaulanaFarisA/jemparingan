export default function ScanUlangPopup() {
  return (
    <div className="bg-white rounded-[18px] relative flex flex-col items-center" style={{ width: 257, height: 182 }}>
      {/* Text inside white box */}
      <span
        className="font-inter text-center"
        style={{
          fontWeight: 600,
          fontSize: 20,
          lineHeight: "150%",
          letterSpacing: "-1.9%",
          color: "#000000",
          paddingTop: 32,
          paddingBottom: 90,
          paddingLeft: 32,
          paddingRight: 32,
        }}
      >
        Barcode tidak valid. Coba scan ulang!
      </span>

      {/* Green box */}
      <div
        className="bg-[#AE6924] rounded-[18px] absolute flex items-center justify-center"
        style={{
          left: 28,
          right: 28,
          top: 115,
          bottom: 21,
        }}
      >
        <span className="font-bold text-white text-[16px] font-inter">Scan Ulang</span>
      </div>
    </div>
  );
}
