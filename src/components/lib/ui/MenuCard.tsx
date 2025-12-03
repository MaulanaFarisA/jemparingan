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
        
        pb-[23px]    
        
        w-[361px]    
        h-[314px]    
        shrink-0     

        bg-[#D9D9D9] 
        rounded-[20px]
        shadow-sm
        overflow-hidden
      "
        >

            {}
            <div className="w-full flex-1 flex items-center justify-center text-[#A33D23]">
                {icon}
            </div>

            {}
            <Button onClick={onClick}>
                {label}
            </Button>

        </div>
    );
}

export default MenuCard;