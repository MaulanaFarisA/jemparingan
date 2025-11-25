// components/lib/ui/Button.tsx
import React from 'react';

interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, className = '' }) => {
    return (
        <button
            onClick={onClick}
            className={`
        w-[298px]
        h-[61px]
        shrink-0
        
        rounded-[16px]
        bg-[#A33D23]       
        
        flex 
        items-center 
        justify-center
        
        text-white
        font-poppins       
        text-[20px]       
        font-semibold     
        text-center
        leading-normal     
        
        hover:opacity-90   
        transition-opacity
        
        ${className}
      `}
        >
            {children}
        </button>
    );
};

export default Button;