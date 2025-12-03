'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Import router untuk redirect
import { createClient } from '@/utils/supabase/client'; // Gunakan client auth yang konsisten
import type { IProfile } from '../entities/profile';
import Container from '@/components/lib/ui/container';
import PanitiaInput from '@/components/lib/ui/panitia-input';
import FloatingNav from '@/components/lib/ui/FloatingNav';
import PanitiaHeader from '@/components/lib/ui/HeaderHome';

export default function Home() {
  const router = useRouter();
  const supabase = createClient();
  
  const [profiles, setProfiles] = useState<IProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true); // State untuk loading page

  useEffect(() => {
    const checkUserAndFetchData = async () => {
      try {
        // 1. Cek apakah User sudah login
        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user) {
          // Jika tidak ada user, tendang ke halaman login
          router.replace('/login');
          return;
        }

        // 2. Jika user ada, lanjut fetch data profile/dashboard
        console.log('User found, fetching profiles...');
        const { data, error } = await supabase.from('profiles').select('*');
        
        if (error) {
          console.log('Error fetching profiles:', error);
        } else {
          setProfiles(data ?? []);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      } finally {
        // Matikan loading hanya jika user ditemukan (karena jika tidak, kita redirect)
        // Kita set timeout kecil agar transisi lebih mulus jika perlu, atau langsung saja:
        setIsLoading(false);
      }
    };

    checkUserAndFetchData();
  }, [router, supabase]);

  // 3. Tampilkan Loading Screen selama proses pengecekan
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#AE2424]"></div>
      </div>
    );
  }

  // 4. Jika lolos (User sudah login), tampilkan Dashboard
  return (
    <Container className="">
      <PanitiaHeader userName="Satya" />
      <PanitiaInput />
      <FloatingNav />
    </Container>
  );
}