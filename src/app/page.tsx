'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; 
import { createClient } from '@/utils/supabase/client';
import { UserX } from 'lucide-react';

// --- UI COMPONENTS ---
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

  // ID Lomba Sementara
  const currentLombaId = 1;

  // 1. CEK AUTH & FETCH DATA USER
  useEffect(() => {
    const checkUserAndFetchData = async () => {
      try {
        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user) {
          router.replace('/login');
          return;
        }

        // Ambil data profile detail (nama & avatar)
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
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-[#AE2424]"></div>
      </div>
    );
  }

  return (
    <>
      {/* MODAL KONFIRMASI LOGOUT */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-[20px] w-full max-w-[300px] flex flex-col items-center overflow-hidden p-6 shadow-2xl scale-100 animate-in zoom-in-95 duration-200">
            <h2 className="text-[#AE2424] font-Poppins font-bold text-xl mb-2 text-center">
              Konfirmasi Keluar
            </h2>
            <p className="text-gray-600 font-Poppins text-center text-sm mb-6">
              Apakah Anda yakin ingin keluar dari akun?
            </p>
            <div className="flex gap-3 w-full">
              <button 
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 py-3 rounded-[10px] bg-gray-200 text-gray-700 font-bold font-Poppins text-sm active:scale-95 transition-all hover:bg-gray-300"
              >
                Batal
              </button>
              <button 
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="flex-1 py-3 rounded-[10px] bg-[#AE2424] text-white font-bold font-Poppins text-sm active:scale-95 transition-all hover:bg-[#8f1f1f] disabled:opacity-70"
              >
                {isLoggingOut ? "..." : "Keluar"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* HALAMAN UTAMA */}
      <Container className="!p-0 !pt-0">
        
        {/* HEADER */}
        <PanitiaHeader 
          userName={userName} 
          userImage={userAvatar} 
          onLogout={() => setShowLogoutModal(true)} 
        />
        
        {/* WRAPPER MAIN CONTENT */}
        <div className="flex flex-col gap-4 w-full mt-[120px] px-6 pb-32 overflow-y-auto">
          
          {/* MENU 1: MASUKKAN NILAI */}
          <PanitiaInput />

          {/* MENU 2: DISKUALIFIKASI */}
          <PanitiaInput 
            title="Diskualifikasi"
            href={`/lomba/${currentLombaId}/diskualifikasi`}
            buttonColor="bg-[#AE2424] hover:bg-[#8f2f2f]"
            icon={
              <div className="w-[100px] h-[100px] bg-[#EAEAEA] rounded-full flex items-center justify-center border-4 border-white shadow-inner">
                 <UserX size={50} color="#AE2424" strokeWidth={2.5} />
              </div>
            }
          />
          
        </div>
        
        {/* NAVIGATION BAR */}
        <div className="absolute bottom-8 z-30">
           <FloatingNav />
        </div>

      </Container>
    </>
  );
}