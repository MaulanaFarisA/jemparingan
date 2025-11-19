'use client';

import supabase from '@/components/lib/db';
import { useEffect, useState } from 'react';
import type { IProfile } from '../entities/profile';
import Container from '@/components/lib/ui/container';

export default function Home() {
  const [profiles, setProfiles] = useState<IProfile[]>([]);

  useEffect(() => {
    const fetchProfiles = async () => {
      console.log('Fetching profiles...');
      const { data, error } = await supabase.from('profile').select('*');
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
      <div>

      </div>
    </Container>
  );
}