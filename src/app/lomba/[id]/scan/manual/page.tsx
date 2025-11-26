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
<<<<<<< HEAD
  bandul_id: number | null;
  profiles: {
    name: string;
    panah: {
      panah_id: number;
      nama_panah: string | null;
=======
  profiles: {  
    name: string;
    panah: {
      panah_id: number;
>>>>>>> e2888e0 (fetch api for scan manual)
    }[];
  };
}

<<<<<<< HEAD
interface BandulRaw {
  bandul_id: number;
  nomor_bandul: number;
}

=======
>>>>>>> e2888e0 (fetch api for scan manual)
export default function ManualSkoringPage() {
  const params = useParams();
  const lombaId = Number(params.id);

<<<<<<< HEAD
  const [loading, setLoading] = useState(false);

  const [rawPeserta, setRawPeserta] = useState<PesertaRaw[]>([]);
  const [rawBandul, setRawBandul] = useState<BandulRaw[]>([]);

  const [bandulOptions, setBandulOptions] = useState<number[]>([]);
  const [pesertaOptions, setPesertaOptions] = useState<string[]>([]);
  const [panahOptions, setPanahOptions] = useState<string[]>([]);

  const [selectedNomorBandul, setSelectedNomorBandul] = useState<number | null>(null);
  const [selectedPesertaName, setSelectedPesertaName] = useState<string | null>(null);
  const [selectedNamaPanah, setSelectedNamaPanah] = useState<string | null>(null);

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

  }, [selectedNomorBandul, rawPeserta, rawBandul]);

  useEffect(() => {
    if (!selectedPesertaName) {
      setPanahOptions([]);
      setSelectedNamaPanah(null);
      return;
    }

    const userFound = rawPeserta.find(
=======
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
          profiles:profile_id (
            name,
            panah ( panah_id )
          )
        `)
        .eq("lomba_id", lombaId);

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
    if (!selectedPesertaName) {
      setPanahList([]);
      setSelectedPanahId(null);
      return;
    }

    const userFound = rawData.find(
>>>>>>> e2888e0 (fetch api for scan manual)
      (r) => r.profiles?.name === selectedPesertaName
    );

    if (userFound && userFound.profiles?.panah?.length > 0) {
<<<<<<< HEAD
      const listNamaPanah = userFound.profiles.panah.map((p) => 
        p.nama_panah ? p.nama_panah : `Panah ID: ${p.panah_id}`
      );
      
      setPanahOptions(listNamaPanah);
      
      if (listNamaPanah.length === 1) {
        setSelectedNamaPanah(listNamaPanah[0]);
      } else {
        setSelectedNamaPanah(null);
      }
    } else {
      setPanahOptions([]);
      setSelectedNamaPanah(null);
    }
  }, [selectedPesertaName, rawPeserta]);

  const handleInputSkor = async (skor: number) => {
    if (!selectedNomorBandul || !selectedPesertaName || !selectedNamaPanah) {
      alert("⚠️ Lengkapi data dulu!");
=======
      const listPanahId = userFound.profiles.panah.map((p) => p.panah_id);
      setPanahList(listPanahId);
      
      if (listPanahId.length === 1) {
        setSelectedPanahId(listPanahId[0]);
      } else {
        setSelectedPanahId(null);
      }
    } else {
      setPanahList([]);
      setSelectedPanahId(null);
    }
  }, [selectedPesertaName, rawData]);

  const handleInputSkor = async (skor: number) => {
    if (!selectedBandul || !selectedPesertaName || !selectedPanahId) {
      alert("⚠️ Mohon pilih Bandul, Peserta, dan Nomor Panah dulu!");
      return;
    }
    if (!lombaId) {
      alert("⚠️ URL tidak valid");
>>>>>>> e2888e0 (fetch api for scan manual)
      return;
    }

    setLoading(true);

    try {
<<<<<<< HEAD
      const userFound = rawPeserta.find(r => r.profiles?.name === selectedPesertaName);
      if (!userFound) throw new Error("Peserta tidak ditemukan data aslinya");

      const panahAsli = userFound.profiles.panah.find(p => {
        const displayName = p.nama_panah ? p.nama_panah : `Panah ID: ${p.panah_id}`;
        return displayName === selectedNamaPanah;
      });

      if (!panahAsli) throw new Error("ID Panah tidak ditemukan");

      const bandulAsli = rawBandul.find(b => b.nomor_bandul === selectedNomorBandul);
      
      const result = await addScore({
        lombaId: lombaId,
        panahIdentifier: panahAsli.panah_id,
        skor: skor,
        bandulId: skor === 3 ? bandulAsli?.bandul_id : undefined
=======
      const result = await addScore({
        lombaId: lombaId,
        panahIdentifier: selectedPanahId,
        skor: skor,
        bandulId: skor === 3 ? selectedBandul : undefined
>>>>>>> e2888e0 (fetch api for scan manual)
      });

      if (result.success) {
        alert(`✅ Skor ${skor} Masuk!`);
      } else {
        alert(`❌ Gagal: ${result.message}`);
      }
<<<<<<< HEAD
    } catch (err: any) {
      console.error(err);
      alert("Error: " + err.message);
=======
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan sistem");
>>>>>>> e2888e0 (fetch api for scan manual)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto flex flex-col gap-6">
      <h1 className="text-xl font-bold text-center mb-4">
<<<<<<< HEAD
        Input Skor Manual
      </h1>

      <SelectDropdown
        label="Pilih Nomor Bandul"
        options={bandulOptions}
        value={selectedNomorBandul}
        onSelect={(v) => setSelectedNomorBandul(v as number)}
=======
        Input Skor Manual (Lomba #{lombaId})
      </h1>

      <SelectDropdown
        label="Pilih Bandul Sasaran"
        options={bandulList}
        value={selectedBandul}
        onSelect={(v) => setSelectedBandul(v as number)}
>>>>>>> e2888e0 (fetch api for scan manual)
      />

      <SelectDropdown
        label="Nama Peserta"
<<<<<<< HEAD
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
=======
        options={pesertaList}
        value={selectedPesertaName}
        onSelect={(v) => setSelectedPesertaName(v as string)}
      />

      <SelectDropdown
        label="ID Panah"
        options={panahList}
        value={selectedPanahId}
        onSelect={(v) => setSelectedPanahId(v as number)}
>>>>>>> e2888e0 (fetch api for scan manual)
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