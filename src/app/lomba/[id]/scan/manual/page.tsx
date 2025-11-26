"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import supabase from '@/components/lib/db';
import { addScore } from "@/components/lib/actions";
import SelectDropdown from "@/components/lib/ui/dropdown";
import SkorTombol from "@/components/lib/ui/skor_tombol"; 
import PopupModal from "@/components/lib/ui/PopupModal";


interface SimpanTombolProps {
  disabled?: boolean;
  onClick?: () => void;
  loading?: boolean;
}

function SimpanTombol({ disabled = false, onClick, loading = false }: SimpanTombolProps) {
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
      {loading ? "MENYIMPAN..." : "SIMPAN"}
    </button>
  );
}

interface PesertaRaw {
  registrasi_id: number;
  bandul_id: number | null;
  profiles: {
    name: string;
    panah: {
      panah_id: number;
      nama_panah: string | null;
    }[];
  };
}

interface BandulRaw {
  bandul_id: number;
  nomor_bandul: number;
}


export default function ManualSkoringPage() {
  const params = useParams();
  const lombaId = Number(params.id);

  const [loading, setLoading] = useState(false);
  
  const [showPopup, setShowPopup] = useState(false);
  const [popupType, setPopupType] = useState<"success" | "update" | "error">("success");
  const [popupMessage, setPopupMessage] = useState("");

  const [rawPeserta, setRawPeserta] = useState<PesertaRaw[]>([]);
  const [rawBandul, setRawBandul] = useState<BandulRaw[]>([]);

  const [bandulOptions, setBandulOptions] = useState<number[]>([]);
  const [pesertaOptions, setPesertaOptions] = useState<string[]>([]);
  const [panahOptions, setPanahOptions] = useState<string[]>([]);

  const [selectedNomorBandul, setSelectedNomorBandul] = useState<number | null>(null);
  const [selectedPesertaName, setSelectedPesertaName] = useState<string | null>(null);
  const [selectedNamaPanah, setSelectedNamaPanah] = useState<string | null>(null);

  const [selectedSkor, setSelectedSkor] = useState<number | null>(null);
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    async function fetchAllData() {
      if (!lombaId) return;

      const { data: dataBandul } = await supabase
        .from("bandul")
        .select("bandul_id, nomor_bandul")
        .eq("lomba_id", lombaId)
        .order("nomor_bandul", { ascending: true });

      if (dataBandul) {
        setRawBandul(dataBandul);
        setBandulOptions(dataBandul.map((b) => b.nomor_bandul));
      }

      const { data: dataPeserta, error } = await supabase
        .from("registrasi_lomba")
        .select(`
          registrasi_id,
          bandul_id,
          profiles:profile_id (
            name,
            panah ( panah_id, nama_panah ) 
          )
        `)
        .eq("lomba_id", lombaId)
        .eq("payment_status", "Sudah bayar");

      if (error) console.error("Error fetch:", error);
      
      // @ts-ignore
      setRawPeserta(dataPeserta || []);
    }

    fetchAllData();
  }, [lombaId]);

  useEffect(() => {
    if (!selectedNomorBandul) {
      setPesertaOptions([]);
      setSelectedPesertaName(null);
      return;
    }
    const bandulAsli = rawBandul.find(b => b.nomor_bandul === selectedNomorBandul);
    if (!bandulAsli) return;
    const filteredPeserta = rawPeserta
      .filter((r) => r.bandul_id === bandulAsli.bandul_id)
      .map((r) => r.profiles?.name)
      .filter(Boolean);
    setPesertaOptions([...new Set(filteredPeserta)] as string[]);
    setSelectedPesertaName(null);
    setPanahOptions([]);
    setSelectedNamaPanah(null);
    setSelectedSkor(null);
    setIsLocked(false);
  }, [selectedNomorBandul, rawPeserta, rawBandul]);

  useEffect(() => {
    if (!selectedPesertaName) {
      setPanahOptions([]);
      setSelectedNamaPanah(null);
      return;
    }
    const userFound = rawPeserta.find((r) => r.profiles?.name === selectedPesertaName);
    if (userFound && userFound.profiles?.panah?.length > 0) {
      const listNamaPanah = userFound.profiles.panah.map((p) => 
        p.nama_panah ? p.nama_panah : `Panah ID: ${p.panah_id}`
      );
      setPanahOptions(listNamaPanah);
      if (listNamaPanah.length === 1) setSelectedNamaPanah(listNamaPanah[0]);
      else setSelectedNamaPanah(null);
    } else {
      setPanahOptions([]);
      setSelectedNamaPanah(null);
    }
    setSelectedSkor(null);
    setIsLocked(false);
  }, [selectedPesertaName, rawPeserta]);

  const handleSelectSkor = (skor: number) => {
    if (selectedSkor === skor) setSelectedSkor(null);
    else setSelectedSkor(skor);
    setIsLocked(false);
  };

  const triggerPopup = (type: "success" | "update" | "error", msg: string) => {
    setPopupType(type);
    setPopupMessage(msg);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    if (popupType !== "error") {
    }
  };

  const handleSubmit = async () => {
    if (!selectedNomorBandul || !selectedPesertaName || !selectedNamaPanah) {
      triggerPopup("error", "Data belum lengkap! Pilih Peserta, Bandul, dan Panah.");
      return;
    }
    if (selectedSkor === null) {
      triggerPopup("error", "Pilih Skor (1, 3, atau 0) terlebih dahulu!");
      return;
    }
    if (!isLocked) {
      triggerPopup("error", "Centang 'Kunci Pilihan' dulu.");
      return;
    }

    setLoading(true);

    try {
      const userFound = rawPeserta.find(r => r.profiles?.name === selectedPesertaName);
      if (!userFound) throw new Error("Data peserta tidak valid.");

      const panahAsli = userFound.profiles.panah.find(p => {
        const displayName = p.nama_panah ? p.nama_panah : `Panah ID: ${p.panah_id}`;
        return displayName === selectedNamaPanah;
      });

      if (!panahAsli) throw new Error("Data panah tidak valid.");

      const bandulAsli = rawBandul.find(b => b.nomor_bandul === selectedNomorBandul);
      
      const result = await addScore({
        lombaId: lombaId,
        panahIdentifier: panahAsli.panah_id,
        skor: selectedSkor,
        bandulId: selectedSkor === 3 ? bandulAsli?.bandul_id : undefined
      });

      if (result.success) {
        if (result.type === 'UPDATE') {
           triggerPopup("update", `⚠️ Skor berhasil diperbarui menjadi ${selectedSkor}.`);
        } else {
           triggerPopup("success", "✅ Skor berhasil disimpan!");
        }
      } else {
        triggerPopup("error", result.message || "Gagal menyimpan.");
      }
    } catch (err: any) {
      console.error(err);
      triggerPopup("error", "Terjadi kesalahan sistem. Cek koneksi internet.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PopupModal 
        isOpen={showPopup}
        type={popupType}
        message={popupMessage}
        onClose={handleClosePopup}
      />

      <div className="flex flex-col min-h-screen">
        <div className="p-6 max-w-md mx-auto flex flex-col gap-6 w-full flex-grow">
          <h1 className="text-xl font-bold text-center mb-4">Input Skor Manual</h1>

          <SelectDropdown
              label="Pilih Nomor Bandul"
              options={bandulOptions}
              value={selectedNomorBandul}
              onSelect={(v) => setSelectedNomorBandul(v as number)}
          />

          <SelectDropdown
              label="Nama Peserta"
              options={pesertaOptions}
              value={selectedPesertaName}
              onSelect={(v) => setSelectedPesertaName(v as string)}
              disabled={!selectedNomorBandul}
          />

          <SelectDropdown
              label="Pilih Anak Panah"
              options={panahOptions}
              value={selectedNamaPanah}
              onSelect={(v) => setSelectedNamaPanah(v as string)}
              disabled={!selectedPesertaName}
          />

          <div className="flex flex-col items-center mt-4">
              <p className="text-2xl font-semibold mb-4">
                Pilih Skor: <span className="text-blue-600">{selectedSkor !== null ? selectedSkor : "-"}</span>
              </p>
              
              <div className="flex flex-row justify-center w-full">
                <SkorTombol 
                  selectedSkor={selectedSkor} 
                  onSelect={handleSelectSkor}
                  disabled={loading}
                />
              </div>
              
              <button 
                  onClick={() => handleSelectSkor(0)}
                  disabled={loading}
                  className={`mt-6 px-6 py-2 rounded-full font-medium transition-all ${
                      selectedSkor === 0 
                      ? "bg-gray-800 text-white" 
                      : "bg-gray-200 text-gray-500 hover:bg-gray-300"
                  }`}
              >
              Input Miss (Skor 0)
              </button>
          </div>
        </div>

        <div 
            className="flex flex-col items-start p-6 bg-[#E4E4E4] border-t-[5px] border-[#AE6924] w-full max-w-md mx-auto"
            style={{ minHeight: 279 }} 
        >
            <label className="flex items-center gap-3 cursor-pointer select-none">
                <input
                    type="checkbox"
                    className="w-6 h-6 accent-[#3b3b3b] rounded cursor-pointer"
                    checked={isLocked}
                    onChange={(e) => setIsLocked(e.target.checked)}
                    disabled={selectedSkor === null} 
                />
                <span className={`text-lg font-semibold ${selectedSkor === null ? "text-gray-400" : "text-[#505050]"}`}>
                    Kunci Pilihan
                </span>
            </label>

            <div className="mt-11 w-full">
                <SimpanTombol
                    disabled={!isLocked || loading}
                    loading={loading}
                    onClick={handleSubmit} 
                />
            </div>
        </div>
      </div>
    </>
  );
}