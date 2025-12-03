"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import supabase from '@/components/lib/db';
import { diskualifikasiPeserta, kembalikanPeserta } from "@/components/lib/actions";
import { Search, CheckCircle, XCircle, AlertTriangle } from "lucide-react"; 

import BackButton from "@/components/lib/ui/BackButton";
import FloatingNav from "@/components/lib//ui/FloatingNav"; 

interface Peserta {
  registrasi_id: number;
  is_disqualified: boolean;
  profiles: {
    name: string;
    role: string;
  };
}

type PopupState = {
  isOpen: boolean;
  type: "confirm_disqualify" | "confirm_restore" | "success" | "error";
  message?: string;
  targetId: number | null;
};

export default function DiskualifikasiPage() {
  const params = useParams();
  const lombaId = Number(params.id);

  const [pesertaList, setPesertaList] = useState<Peserta[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const [popup, setPopup] = useState<PopupState>({
    isOpen: false,
    type: "confirm_disqualify",
    message: "",
    targetId: null,
  });

  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      if (!lombaId) return;
      
      const { data, error } = await supabase
        .from("registrasi_lomba")
        .select(`
          registrasi_id,
          is_disqualified,
          profiles:profile_id ( name, role )
        `)
        .eq("lomba_id", lombaId)
        .eq("payment_status", "Sudah bayar")
        .order("registrasi_id", { ascending: true });

      if (error) {
        console.error("Error fetch:", error);
      } else if (data) {
        const formattedData = data.map((item: any) => ({
          registrasi_id: item.registrasi_id,
          is_disqualified: item.is_disqualified,
          profiles: Array.isArray(item.profiles) ? item.profiles[0] : item.profiles
        }));
        
        // @ts-ignore
        const filteredByRole = formattedData.filter((item: Peserta) => item.profiles?.role === 'user');
        setPesertaList(filteredByRole);
      }
      setLoading(false);
    }

    fetchData();
  }, [lombaId]);


  const openConfirmDisqualify = (id: number) => {
    setPopup({ isOpen: true, type: "confirm_disqualify", targetId: id });
  };

  const openConfirmRestore = (id: number) => {
    setPopup({ isOpen: true, type: "confirm_restore", targetId: id });
  };

  const closePopup = () => {
    setPopup({ ...popup, isOpen: false });
  };


  const executeDisqualify = async () => {
    if (!popup.targetId) return;
    setActionLoading(true);

    const result = await diskualifikasiPeserta(popup.targetId);

    if (result.success) {
      updateLocalList(popup.targetId, true);
      setPopup({ 
        isOpen: true, 
        type: "success", 
        targetId: null, 
        message: "Peserta berhasil didiskualifikasi." 
      });
    } else {
      setPopup({ 
        isOpen: true, 
        type: "error", 
        targetId: null, 
        message: result.message 
      });
    }
    setActionLoading(false);
  };

  const executeRestore = async () => {
    if (!popup.targetId) return;
    setActionLoading(true);

    const result = await kembalikanPeserta(popup.targetId);

    if (result.success) {
      updateLocalList(popup.targetId, false);
      setPopup({ 
        isOpen: true, 
        type: "success", 
        targetId: null, 
        message: "Peserta berhasil dipulihkan." 
      });
    } else {
      setPopup({ 
        isOpen: true, 
        type: "error", 
        targetId: null, 
        message: result.message 
      });
    }
    setActionLoading(false);
  };

  const updateLocalList = (id: number, status: boolean) => {
    setPesertaList((prev) => 
      prev.map((p) => 
        p.registrasi_id === id ? { ...p, is_disqualified: status } : p
      )
    );
  };

  const filteredPeserta = pesertaList.filter((p) =>
    p.profiles?.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {popup.isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-[20px] w-full max-w-sm flex flex-col items-center p-8 shadow-2xl scale-100 animate-in zoom-in-95 duration-200">
            
            {popup.type === "confirm_disqualify" && (
              <>
                <div className="mb-4 bg-red-100 p-4 rounded-full">
                  <AlertTriangle size={40} className="text-red-500" />
                </div>
                <h2 className="text-xl font-bold text-center mb-2 font-Poppins text-[#333]">
                  Diskualifikasi Peserta?
                </h2>
                <p className="text-center text-gray-500 mb-8 font-Poppins text-sm">
                  Peserta ini tidak akan bisa melanjutkan lomba.
                </p>
                <div className="flex gap-4 w-full justify-center">
                  <button onClick={closePopup} className="flex-1 py-3 bg-gray-200 text-gray-700 font-bold rounded-full hover:bg-gray-300 transition-colors font-Poppins">
                    Batal
                  </button>
                  <button onClick={executeDisqualify} disabled={actionLoading} className="flex-1 py-3 bg-[#FF0000] text-white font-bold rounded-full hover:bg-[#cc0000] transition-colors font-Poppins">
                    {actionLoading ? "..." : "Ya, Diskualifikasi"}
                  </button>
                </div>
              </>
            )}

            {popup.type === "confirm_restore" && (
              <>
                <div className="mb-4 bg-green-100 p-4 rounded-full">
                  <CheckCircle size={40} className="text-green-600" />
                </div>
                <h2 className="text-xl font-bold text-center mb-2 font-Poppins text-[#333]">
                  Pulihkan Peserta?
                </h2>
                <p className="text-center text-gray-500 mb-8 font-Poppins text-sm">
                  Status diskualifikasi akan dicabut.
                </p>
                <div className="flex gap-4 w-full justify-center">
                  <button onClick={closePopup} className="flex-1 py-3 bg-gray-200 text-gray-700 font-bold rounded-full hover:bg-gray-300 transition-colors font-Poppins">
                    Batal
                  </button>
                  <button onClick={executeRestore} disabled={actionLoading} className="flex-1 py-3 bg-[#28A745] text-white font-bold rounded-full hover:bg-[#218838] transition-colors font-Poppins">
                    {actionLoading ? "..." : "Ya, Pulihkan"}
                  </button>
                </div>
              </>
            )}

            {popup.type === "success" && (
              <>
                <div className="mb-4 bg-green-100 p-4 rounded-full animate-bounce">
                  <CheckCircle size={48} className="text-green-600" />
                </div>
                <h2 className="text-xl font-bold text-center mb-2 font-Poppins text-[#333]">
                  Berhasil!
                </h2>
                <p className="text-center text-gray-500 mb-8 font-Poppins">
                  {popup.message}
                </p>
                <button onClick={closePopup} className="w-full py-3 bg-[#42C806] text-white font-bold rounded-full hover:bg-[#38a805] transition-colors font-Poppins">
                  Oke, Mengerti
                </button>
              </>
            )}

            {popup.type === "error" && (
              <>
                <div className="mb-4 bg-red-100 p-4 rounded-full">
                  <XCircle size={48} className="text-red-500" />
                </div>
                <h2 className="text-xl font-bold text-center mb-2 font-Poppins text-[#333]">
                  Gagal!
                </h2>
                <p className="text-center text-gray-500 mb-8 font-Poppins">
                  {popup.message}
                </p>
                <button onClick={closePopup} className="w-full py-3 bg-gray-800 text-white font-bold rounded-full hover:bg-gray-700 transition-colors font-Poppins">
                  Tutup
                </button>
              </>
            )}

          </div>
        </div>
      )}

      <div className="min-h-screen bg-[#F9F9F9] flex flex-col pb-32 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
        </div>

        <div className="px-6 pt-8 pb-4 flex items-center gap-4 relative z-10">
          <BackButton /> 
          <h1 className="text-xl sm:text-2xl font-bold text-[#555] font-Poppins flex-1 text-center pr-8">
            Diskualifikasi Peserta
          </h1>
        </div>

        <div className="px-6 mb-6 relative z-10">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Nama Peserta"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 pl-5 pr-12 rounded-full border border-gray-300 bg-white focus:outline-none focus:border-gray-500 shadow-sm font-Poppins text-sm placeholder:text-gray-300"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
              <Search size={20} />
            </div>
          </div>
        </div>

        <div className="px-6 flex flex-col gap-3 relative z-10">
          {loading ? (
            <p className="text-center text-gray-400 mt-10 animate-pulse">Memuat data...</p>
          ) : filteredPeserta.length === 0 ? (
            <p className="text-center text-gray-400 mt-10">
               {pesertaList.length === 0 ? "Tidak ada peserta (User) ditemukan." : "Nama tidak ditemukan."}
            </p>
          ) : (
            filteredPeserta.map((p) => (
              <div 
                key={p.registrasi_id} 
                className={`flex items-center justify-between py-3 pl-5 pr-3 rounded-full shadow-sm border border-gray-100 transition-all
                  ${p.is_disqualified ? "bg-[#FFF4F4] border-red-100" : "bg-[#D9D9D9]"}
                `}
              >
                <span className={`font-bold text-sm truncate max-w-[50%] font-Poppins ${p.is_disqualified ? "text-red-400 line-through decoration-2" : "text-[#7D7979]"}`}>
                  {p.profiles?.name}
                </span>
                
                {p.is_disqualified ? (
                   <button
                     onClick={() => openConfirmRestore(p.registrasi_id)} // Trigger Popup Hijau
                     className="bg-[#28A745] hover:bg-[#218838] text-white text-[10px] font-bold px-5 py-2 rounded-full transition-colors font-Poppins shadow-sm flex items-center gap-1"
                   >
                     <span>↺</span> Kembalikan
                   </button>
                ) : (
                  <button
                    onClick={() => openConfirmDisqualify(p.registrasi_id)} // Trigger Popup Merah
                    className="bg-[#AE3C3C] hover:bg-[#8f2f2f] text-white text-[10px] font-bold px-5 py-2 rounded-full transition-colors font-Poppins shadow-sm"
                  >
                    Diskualifikasi
                  </button>
                )}
              </div>
            ))
          )}
        </div>

        <FloatingNav /> 
      </div>
    </>
  );
}