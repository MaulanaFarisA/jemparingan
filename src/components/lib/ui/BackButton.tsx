// components/lib/ui/BackButton.tsx

"use client"; 

import React from 'react';
import { useRouter } from 'next/navigation'; 

const BackButton: React.FC = () => {
  const router = useRouter();

  return (
    <button 
      onClick={() => router.back()}
      className="
        bg-white 
        rounded-full 
        w-[30px]  
        h-[30px]  
        flex 
        items-center 
        justify-center 
        shadow-md 
        hover:bg-gray-100 
        transition-colors
      "
    >
      
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">

        <path 
          fillRule="evenodd" 
          clipRule="evenodd" 
          d="M12.2676 14.2812L18.9102 18.6824L17.5819 19.5625L10.2751 14.7213C10.0989 14.6046 10 14.4463 10 14.2812C10 14.1162 10.0989 13.9579 10.2751 13.8412L17.5819 9L18.9102 9.8801L12.2676 14.2812Z" 
          fill="#7D7979"
        />
      </svg>
    </button>
  );
};

export default BackButton;