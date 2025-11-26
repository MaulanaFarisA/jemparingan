// components/lib/ui/MenuCard.tsx

import React from 'react';
import { Button } from './button';

interface MenuCardProps {
    icon: React.ReactNode;
    label: string;
    onClick: () => void;
}

const MenuCard: React.FC<MenuCardProps> = ({ icon, label, onClick }) => {
    return (
        <div
            className="
        flex flex-col items-center
        
        /* --- KUNCI DARI BAWAH --- */
        pb-[23px]    /* Jarak Button ke Bawah Card tetap 23px */
        
        /* --- UKURAN CARD --- */
        w-[361px]    
        h-[314px]    
        shrink-0     

        /* --- TAMPILAN --- */
        bg-[#D9D9D9] 
        rounded-[20px]
        shadow-sm
        overflow-hidden
      "
        >

            {/* AREA IKON (WRAPPER BARU)
         flex-1: "Ambil semua sisa ruang kosong di atas tombol"
         flex + items-center: "Taruh konten (ikon) persis di tengah ruang ini"
         
         Hasilnya: Jarak Atas dan Jarak Bawah otomatis sama.
      */}
            <div className="w-full flex-1 flex items-center justify-center text-[#A33D23]">
                {icon}
            </div>

            {/* TOMBOL (Posisi didorong ke bawah oleh flex-1 di atasnya) */}
            <Button onClick={onClick}>
                {label}
            </Button>

        </div>
    );
}

export default MenuCard;