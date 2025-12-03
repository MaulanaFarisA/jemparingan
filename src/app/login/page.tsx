// src/app/login/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client"; // Import helper Supabase Anda

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient(); // Inisialisasi client

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      // 1. Panggil fungsi login bawaan Supabase
      // Ini otomatis mengecek tabel auth.users
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        // Jika password salah atau user tidak ditemukan
        throw error;
      }

      // 2. Jika berhasil, Supabase otomatis menyimpan session di cookies/local storage
      // Redirect ke halaman utama
      router.push("/"); 
      router.refresh(); // Refresh agar server component mengenali session baru
      
    } catch (error: any) {
      setErrorMsg(error.message || "Gagal login. Periksa email dan password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {/* Container Khusus Resolusi HP */}
      <div className="relative w-full max-w-[430px] h-screen bg-white shadow-2xl overflow-hidden flex flex-col">
        
        {/* === BAGIAN ATAS (GAMBAR) === */}
        <div className="relative w-full h-[35%] shrink-0">
          <div 
            className="absolute inset-0 w-full h-full overflow-hidden rounded-b-[60px] z-10"
            style={{
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)"
            }}
          >
            <Image
              src="/login.png" 
              alt="Pemanah Jemparingan"
              fill
              className="object-cover object-top"
              priority
            />
            <div className="absolute inset-0 bg-black/10"></div>
          </div>
        </div>

        {/* === BAGIAN BAWAH (FORM) === */}
        <div className="flex-1 px-8 pt-10 pb-6 flex flex-col">
          
          <h1 className="text-[#AE2424] font-poppins font-bold text-4xl text-center mb-8 drop-shadow-sm">
            Login
          </h1>

          {/* Error Alert */}
          {errorMsg && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm text-center font-poppins">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            
            {/* Input Email */}
            <div className="flex flex-col gap-2">
              <label className="text-[#1E1E1E] font-semibold text-sm font-poppins">
                Email
              </label>
              <input
                type="email"
                placeholder="email@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-[50px] px-4 rounded-[10px] border border-[#CECECE] text-black placeholder:text-[#AFAFAF] focus:outline-none focus:border-[#AE2424] focus:ring-1 focus:ring-[#AE2424] transition-all font-poppins"
                required
              />
            </div>

            {/* Input Password */}
            <div className="flex flex-col gap-2">
              <label className="text-[#1E1E1E] font-semibold text-sm font-poppins">
                Password
              </label>
              <input
                type="password"
                placeholder="Tuliskan Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-[50px] px-4 rounded-[10px] border border-[#CECECE] text-black placeholder:text-[#AFAFAF] focus:outline-none focus:border-[#AE2424] focus:ring-1 focus:ring-[#AE2424] transition-all font-poppins"
                required
              />
            </div>

            <Link 
              href="/forgot-password" 
              className="text-[#1E1E1E] text-sm underline decoration-1 underline-offset-2 font-poppins hover:text-[#AE2424] transition-colors w-fit"
            >
              Lupa Password
            </Link>

            {/* Tombol Masuk */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full h-[55px] mt-4 text-white rounded-[10px] font-bold text-lg font-poppins shadow-md transition-all
                ${loading 
                  ? "bg-[#8B4513]/70 cursor-not-allowed" 
                  : "bg-[#8B4513] hover:bg-[#723a0f] active:scale-95"
                }`}
            >
              {loading ? "Memproses..." : "Masuk"}
            </button>

          </form>

          {/* Footer Daftar */}
          <div className="mt-auto mb-4 text-center">
            <span className="text-black font-bold font-poppins text-sm">
              Belum punya akun?{" "}
            </span>
            <Link 
              href="/register" 
              className="text-[#6A0DAD] font-bold font-poppins text-sm underline hover:text-[#520a85]"
            >
              Daftar
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}