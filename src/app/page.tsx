'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import supabase from '@/components/lib/db';
import type { IProfile } from '../entities/profile';
import Container from '@/components/lib/ui/container';
import HeaderHome from '@/components/lib/ui/HeaderHome';
import MenuCard from '@/components/lib/ui/MenuCard';

export default function Home() {
  const router = useRouter();
  const [profiles, setProfiles] = useState<IProfile[]>([]);

  useEffect(() => {
    const fetchProfiles = async () => {
      // ...
      const { data } = await supabase.from('profile').select('*');
      setProfiles(data ?? []);
    };
    fetchProfiles();
  }, []);

  const currentUser = profiles[0];
  const userName = currentUser?.nama || (profiles.length === 0 ? "Memuat..." : "User");
  const userImage = currentUser?.foto || null;

  const handleMasukNilai = () => {
    router.push('/scan');
  };

  return (
    <Container className="w-[414px] h-screen !p-0 !m-0 !items-stretch">

      <HeaderHome
        userName={userName}
        userImage={userImage}
      />

      <div className="
        flex-1            
        flex flex-col 
        items-center       
        
        justify-start     
        pt-[45px]          
      ">

        <MenuCard
          label="Masukkan Nilai"
          onClick={handleMasukNilai}
          icon={
            <Image
              src="/iconmasuk.svg"
              alt="Icon Masuk"
              width={175}
              height={155}
              className="object-contain"
              priority
            />
          }
        />

      </div>

    </Container>
  );
}