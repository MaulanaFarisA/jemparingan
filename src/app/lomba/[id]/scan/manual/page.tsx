"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import supabase from '@/components/lib/db';
import { addScore } from "@/components/lib/actions";
import SelectDropdown from "@/components/lib/ui/dropdown";
import SatuTombol from "@/components/lib/ui/1_tombol";
import TigaTombol from "@/components/lib/ui/3_tombol";

interface PesertaRaw {
  registrasi_id: number;
  bandul_id: number | null;
  profiles: {
    name: string;
    panah: { panah_id: number }[];
  };
}

export default function ManualSkoringPage() {
  const params = useParams();
  const lombaId = Number(params.id);

  const [rawData, setRawData] = useState<PesertaRaw[]>([]);
  const [loading, setLoading] = useState(false);

  const [bandulList] = useState<number[]>(Array.from({ length: 20 }, (_, i) => i + 1));
  const [pesertaList, setPesertaList] = useState<string[]>([]);
  const [panahList, setPanahList] = useState<number[]>([]);

  const [selectedBandul, setSelectedBandul] = useState<number | null>(null);
  const [selectedPesertaName, setSelectedPesertaName] = useState<string | null>(null);
  const [selectedPanahId, setSelectedPanahId] = useState<number | null>(null);

  useEffect(() => {
    async function fetchData() {
        console.log("CEK ID LOMBA:", lombaId);

        if (!lombaId) {
            console.error("ID LOMBA TIDAK VALID/KOSONG");
            return;
        }
        
      const { data, error } = await supabase
        .from("registrasi_lomba")
        .select(`
          registrasi_id,
          bandul_id,
          profiles:profile_id (
            name,
            panah ( panah_id )
          )
        `)
        .eq("lomba_id", lombaId)
        .eq("payment_status", "Sudah bayar");

      if (error) {
        console.error("Error fetch peserta:", error);
        return;
      }

      console.log("DATA BERHASIL DIAMBIL:", data);

      // @ts-ignore
      setRawData(data || []);

      // @ts-ignore
      const namaPeserta = data?.map((d) => d.profiles?.name).filter(Boolean) || [];
      const uniqueNama = [...new Set(namaPeserta)];
      setPesertaList(uniqueNama as string[]);
    }

    fetchData();
  }, [lombaId]);

useEffect(() => {
    if (!selectedBandul) {
      setPesertaList([]);
      setSelectedPesertaName(null);
      return;
    }

    const filteredPeserta = rawData
      .filter((r) => r.bandul_id === selectedBandul)
      .map((r) => r.profiles?.name)
      .filter(Boolean);

    const uniqueNama = [...new Set(filteredPeserta)];
    setPesertaList(uniqueNama as string[]);
    
    setSelectedPesertaName(null);
    setPanahList([]);
    setSelectedPanahId(null);

  }, [selectedBandul, rawData]);

  const handleInputSkor = async (skor: number) => {
    if (!selectedBandul || !selectedPesertaName || !selectedPanahId) {
      alert("⚠️ Mohon pilih Bandul, Peserta, dan Nomor Panah dulu!");
      return;
    }
    if (!lombaId) {
      alert("⚠️ URL tidak valid");
      return;
    }

    setLoading(true);

    try {
      const result = await addScore({
        lombaId: lombaId,
        panahIdentifier: selectedPanahId,
        skor: skor,
        bandulId: skor === 3 ? selectedBandul : undefined
      });

      if (result.success) {
        alert(`✅ Skor ${skor} Masuk!`);
      } else {
        alert(`❌ Gagal: ${result.message}`);
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan sistem");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto flex flex-col gap-6">
      <h1 className="text-xl font-bold text-center mb-4">
        Input Skor Manual (Lomba #{lombaId})
      </h1>

      <SelectDropdown
        label="Pilih Bandul Sasaran"
        options={bandulList}
        value={selectedBandul}
        onSelect={(v) => setSelectedBandul(v as number)}
      />

      <SelectDropdown
        label="Nama Peserta"
        options={pesertaList}
        value={selectedPesertaName}
        onSelect={(v) => setSelectedPesertaName(v as string)}
      />

      <SelectDropdown
        label="ID Panah"
        options={panahList}
        value={selectedPanahId}
        onSelect={(v) => setSelectedPanahId(v as number)}
        disabled={!selectedPesertaName}
      />

      <div className="flex flex-col items-center mt-6">
        <p className="text-2xl font-semibold mb-4">Pilih Skor : </p>
        
        <div className="flex flex-row gap-8 justify-center w-full">
          <SatuTombol onClick={() => handleInputSkor(1)} disabled={loading} />
          <TigaTombol onClick={() => handleInputSkor(3)} disabled={loading} />
        </div>
        
        <button 
           onClick={() => handleInputSkor(0)}
           disabled={loading}
           className="mt-6 text-gray-500 underline font-medium"
        >
          {loading ? "Menyimpan..." : "Input Miss (Skor 0)"}
        </button>
      </div>
    </div>
  );
}