// components/lib/FloatingNav.tsx

'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import NavButton from './NavButton';
import Avatar from './Avatar';

export default function FloatingNav() {
  const [activeTab, setActiveTab] = useState('');

  return (
    <nav
      style={{ width: '354px', minWidth: '354px', maxWidth: 'none', flexShrink: 0 }}
      className="
        absolute bottom-8 left-1/2 -translate-x-1/2
        h-[65px]
        rounded-[40px]
        bg-[#AE6924]
        shadow-2xl

        flex
        items-center
        justify-center
        gap-[80px]
        px-10
        z-50
      "
    >

      {/* 1. TOMBOL HOME (Pakai File) */}
      <NavButton
        isActive={activeTab === 'home'}
        onClick={() => setActiveTab('home')}
        icon={
          <Image
            src="/Home.svg"
            alt="Home"
            width={27}
            height={27}
          />
        }
      />

      {/* 2. TOMBOL PANAHAN (Pakai File) */}
      <NavButton
        isActive={activeTab === 'archery'}
        onClick={() => setActiveTab('archery')}
        icon={
          <Image
            src="/Panah.svg"
            alt="Archery"
            width={31}
            height={31}
          />
        }
      />

      {/* 3. TOMBOL PROFIL (Avatar) */}
      <NavButton
        isActive={activeTab === 'profile'}
        onClick={() => setActiveTab('profile')}
        icon={
          <div className="
              w-[30px]
              h-[30px]
              shrink-0
              flex items-center justify-center overflow-hidden rounded-full
              ">

            <Avatar src={null} alt="Profile" />
          </div>
        }
      />

    </nav>
  );
}