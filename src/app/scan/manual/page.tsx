"use client";

import { useEffect, useState } from "react";
import SelectDropdown from "@/components/lib/ui/dropdown";
import { Button } from "@/components/lib/ui/button";
import SatuTombol from "@/components/lib/ui/1_tombol";
import TigaTombol from "@/components/lib/ui/3_tombol";

interface Peserta {
  id: string;
  nama: string;
  bandul: number;
  panah: string | string[]; // boleh single atau array
}

export default function ManualSkoringPage() {
  const [pesertaData, setPesertaData] = useState<Peserta[]>([]);

  // dropdown lists
  const [bandulList, setBandulList] = useState<number[]>([]);
  const [pesertaList, setPesertaList] = useState<string[]>([]);
  const [panahList, setPanahList] = useState<string[]>([]);

  // selected values
  const [selectedBandul, setSelectedBandul] = useState<number | null>(null);
  const [selectedPeserta, setSelectedPeserta] = useState<string | null>(null);
  const [selectedPanah, setSelectedPanah] = useState<string | null>(null);

  // -------------------------------------------------------------------
  // FETCH DATABASE
  // -------------------------------------------------------------------
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/peserta");
        if (!res.ok) throw new Error("Gagal fetch data peserta");

        const data: Peserta[] = await res.json();
        setPesertaData(data);

        const uniqueBandul = [...new Set(data.map((d) => d.bandul))].sort(
          (a, b) => a - b
        );

        setBandulList(uniqueBandul);
      } catch (e) {
        console.error("ERROR FETCH:", e);
      }
    }

    fetchData();
  }, []);

  // -------------------------------------------------------------------
  // WHEN BANDUL SELECTED → FILTER PESERTA
  // -------------------------------------------------------------------
  useEffect(() => {
    if (selectedBandul === null) {
      setPesertaList([]);
      setSelectedPeserta(null);
      setPanahList([]);
      setSelectedPanah(null);
      return;
    }

    const filtered = pesertaData
      .filter((p) => p.bandul === selectedBandul)
      .map((p) => p.nama);

    setPesertaList(filtered);
    setSelectedPeserta(null);
    setPanahList([]);
    setSelectedPanah(null);
  }, [selectedBandul, pesertaData]);

  // -------------------------------------------------------------------
  // WHEN PESERTA SELECTED → FILTER PANAH
  // -------------------------------------------------------------------
  useEffect(() => {
    if (!selectedPeserta) {
      setPanahList([]);
      setSelectedPanah(null);
      return;
    }

    const peserta = pesertaData.find((p) => p.nama === selectedPeserta);
    if (!peserta) {
      setPanahList([]);
      setSelectedPanah(null);
      return;
    }

    let panah: string[] = [];

    // if panah stored as string array
    if (Array.isArray(peserta.panah)) {
      panah = peserta.panah;
    }
    // if string, maybe "1,2,3" or "A"
    else if (typeof peserta.panah === "string") {
      if (peserta.panah.includes(",")) {
        panah = peserta.panah.split(",").map((x) => x.trim());
      } else {
        panah = [peserta.panah];
      }
    }

    setPanahList(panah);
    setSelectedPanah(null);
  }, [selectedPeserta, pesertaData]);

  // -------------------------------------------------------------------
  // SUBMIT HANDLER
  // -------------------------------------------------------------------
  const handleSubmit = () => {
    if (!selectedBandul || !selectedPeserta || !selectedPanah) {
      alert("Lengkapi semua pilihan terlebih dahulu!");
      return;
    }

    console.log("Submit:", {
      bandul: selectedBandul,
      peserta: selectedPeserta,
      panah: selectedPanah,
    });
  };

  // -------------------------------------------------------------------
  // RENDER
  // -------------------------------------------------------------------
  return (
    <div className="p-6 max-w-md mx-auto flex flex-col gap-6">
      {/* <h1 className="text-xl font-semibold text-center">Input Manual</h1> */}

      <SelectDropdown
        label="Pilih Bandul"
        options={bandulList}
        value={selectedBandul}
        onSelect={(v) => setSelectedBandul(v)}
      />

      <SelectDropdown
        label="Nama Peserta"
        options={pesertaList}
        value={selectedPeserta}
        onSelect={(v) => setSelectedPeserta(v)}
        disabled={!selectedBandul}
      />

      <SelectDropdown
        label="Nomor Panah"
        options={panahList}
        value={selectedPanah}
        onSelect={(v) => setSelectedPanah(v)}
        disabled={!selectedPeserta}
      />

      <div className="flex flex-col items-center">
        <p className="text-2xl font-semibold">Pilih Skor : </p>
        <div className="flex flex-row gap-14 mt-3">
          <SatuTombol />
          <TigaTombol />
        </div>
      </div>
    </div>
  );
}
