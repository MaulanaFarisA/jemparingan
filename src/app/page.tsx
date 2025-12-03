'use client';

import supabase from '@/components/lib/db';
import { useEffect, useState } from 'react';
import type { IProfile } from '../entities/profile';
import Container from '@/components/lib/ui/container';
import PanitiaInput from '@/components/lib/ui/panitia-input';
import FloatingNav from '@/components/lib/ui/FloatingNav';
import PanitiaHeader from '@/components/lib/ui/HeaderHome';
import Badge from '@/components/lib/ui/Badge';
import ScoringHeader from '@/components/lib/ui/SkoringHeader';

export default function Home() {
  const [profiles, setProfiles] = useState<IProfile[]>([]);

  useEffect(() => {
    const fetchProfiles = async () => {
      console.log('Fetching profiles...');
      const { data, error } = await supabase.from('profiles').select('*');
      if (error) {
        console.log('Error:', error);
      } else {
        console.log('Data from Supabase:', data);
        setProfiles(data ?? []);
      }
    };
    fetchProfiles();
  }, []);

  console.log('Current profiles state:', profiles);
  return (
    <Container className="">
      <PanitiaHeader userName="Satya" />
      <PanitiaInput />
      <FloatingNav />
    </Container>
  );
}