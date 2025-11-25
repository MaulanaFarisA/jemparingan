// components/lib/ui/Badge.tsx

import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
}

const Badge: React.FC<BadgeProps> = ({ children }) => {
  return (
    <span 
      className="
        bg-[#D0A600] 
        text-white 
        rounded-[10px] 
        text-xl 
        py-1 
        px-[13px] 
        font-semibold
      "
    >
      {children}
    </span>   
  );
};

export default Badge;