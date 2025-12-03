// src/app/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; 
import { createClient } from '@/utils/supabase/client';
import Container from '@/components/lib/ui/container';
import PanitiaInput from '@/components/lib/ui/panitia-input';
import FloatingNav from '@/components/lib/ui/FloatingNav';
import PanitiaHeader from '@/components/lib/ui/HeaderHome';

export default function Home() {
  const router = useRouter();
  const supabase = createClient();
  
  // State Data User
  const [userName, setUserName] = useState("Memuat...");
  const [userAvatar, setUserAvatar] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // State Logout Modal
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    const checkUserAndFetchData = async () => {
      try {
        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user) {
          router.replace('/login');
          return;
        }

        const { data: profile } = await supabase
          .from('profiles')
          .select('name, avatar_url')
          .eq('id', user.id) 
          .single();
        
        if (profile) {
          setUserName(profile.name || "Tanpa Nama");
          setUserAvatar(profile.avatar_url);
        }

      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkUserAndFetchData();
  }, [router, supabase]);

  // --- FUNGSI LOGOUT ---
  const handleLogout = async () => {
    setIsLoggingOut(true);
    await supabase.auth.signOut();
    router.replace('/login');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#AE2424]"></div>
      </div>
    );
  }

  return (
    <>
      {/* MODAL KONFIRMASI LOGOUT */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-[20px] w-full max-w-[300px] flex flex-col items-center overflow-hidden animate-in fade-in zoom-in duration-200 p-6">
            <h2 className="text-[#AE2424] font-poppins font-bold text-xl mb-2 text-center">
              Konfirmasi Keluar
            </h2>
            <p className="text-gray-600 font-poppins text-center text-sm mb-6">
              Apakah Anda yakin ingin keluar dari akun?
            </p>
            <div className="flex gap-3 w-full">
              <button 
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 py-3 rounded-[10px] bg-gray-200 text-gray-700 font-bold font-poppins text-sm active:scale-95 transition-all"
              >
                Batal
              </button>
              <button 
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="flex-1 py-3 rounded-[10px] bg-[#AE2424] text-white font-bold font-poppins text-sm active:scale-95 transition-all"
              >
                {isLoggingOut ? "..." : "Keluar"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* HALAMAN UTAMA */}
      <Container className="relative !p-0 !pt-0 overflow-hidden">
        
        {/* Pass fungsi untuk buka modal ke Header */}
        <PanitiaHeader 
          userName={userName} 
          userImage={userAvatar} 
          onLogout={() => setShowLogoutModal(true)} 
        />
        
        <div className="flex flex-col items-center w-full mt-[160px] px-6">
          <PanitiaInput />
        </div>
        
        <FloatingNav />
      </Container>
    </>
  );
}