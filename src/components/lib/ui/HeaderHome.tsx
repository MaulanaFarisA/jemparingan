// src/components/lib/ui/HeaderHome.tsx

import React from 'react';
import Avatar from './Avatar'; 
import { LogOut, User } from 'lucide-react'; // Icon dari lucide-react
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"; // Komponen Dropdown bawaan Shadcn/UI project Anda

interface PanitiaHeaderProps {
  userName: string;
  userImage?: string | null;
  onLogout?: () => void; 
}

const PanitiaHeader: React.FC<PanitiaHeaderProps> = ({ userName, userImage, onLogout }) => {
  return (
    <header 
      className="
        /* Posisi & Layout */
        absolute      
        top-0         
        left-0        
        w-full        
        z-20          
        h-[91px]         
        px-[35px]  
        flex 
        items-center 
        justify-start
        gap-[17px]        
        
        /* Background */
        bg-cover
        bg-center
        bg-[linear-gradient(rgba(92,31,18,0.85),rgba(92,31,18,0.85)),url('/batik.svg')]
      "
    >
      {/* --- IMPLEMENTASI DROPDOWN --- */}
      <DropdownMenu>
        {/* Trigger: Avatar User */}
        <DropdownMenuTrigger className="relative z-10 shrink-0 rounded-full outline-none focus:ring-4 focus:ring-white/20 transition-all cursor-pointer">
           <Avatar src={userImage} alt={userName} />
        </DropdownMenuTrigger>
        
        {/* Content: Menu yang muncul saat diklik */}
        <DropdownMenuContent align="start" className="w-56 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 p-2 font-poppins">
          <DropdownMenuLabel className="text-gray-500 text-xs font-normal px-2 py-1.5">
            Akun Pengguna
          </DropdownMenuLabel>
          
          {/* Menu Item (Contoh: Profil, jika nanti dibutuhkan) */}
          <DropdownMenuItem disabled className="text-gray-700 cursor-not-allowed opacity-60 rounded-lg px-2 py-2">
            <User className="mr-2 h-4 w-4" />
            <span>Profil Saya</span>
          </DropdownMenuItem>

          <DropdownMenuSeparator className="bg-gray-100 my-1" />

          {/* Menu Item: LOGOUT */}
          <DropdownMenuItem 
            onClick={onLogout}
            className="text-red-600 focus:text-red-700 focus:bg-red-50 cursor-pointer rounded-lg px-2 py-2 font-medium"
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Keluar</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Text Nama */}
      <h1 className="
          relative z-10
          text-white 
          text-[22px]   
          font-semibold 
          leading-normal
          drop-shadow-md
        ">
        {userName} <span className="uppercase font-bold text-white/80">[PANITIA]</span>
      </h1>
    </header>
  );
};

export default PanitiaHeader;