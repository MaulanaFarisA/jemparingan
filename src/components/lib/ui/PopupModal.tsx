"use client";

interface PopupModalProps {
  isOpen: boolean;
  type: "success" | "update" | "error";
  message: string;
  onClose: () => void;
}

export default function PopupModal({ isOpen, type, message, onClose }: PopupModalProps) {
  if (!isOpen) return null;

  let title = "";
  let bgColor = "";

  if (type === "success") {
    title = "BERHASIL!";
    bgColor = "bg-[#58A700]";
  } else if (type === "update") {
    title = "TERUPDATE!";
    bgColor = "bg-[#FFA500]";
  } else {
    title = "GAGAL!";
    bgColor = "bg-[#AE2424]";
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-[20px] w-full max-w-sm flex flex-col items-center overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className={`${bgColor} w-full py-4 flex justify-center`}>
          <h2 className="text-white font-Poppins font-bold text-2xl tracking-widest">
            {title}
          </h2>
        </div>
        
        <div className="p-8 text-center">
          <p className="text-[#505050] font-Poppins text-lg font-medium leading-relaxed">
            {message}
          </p>
        </div>

        <div className="pb-6 px-6 w-full">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold font-Poppins transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}