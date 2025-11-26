import React from 'react';

interface NavButtonProps {
  icon: React.ReactNode;
  onClick?: () => void;
  isActive?: boolean;
}

const NavButton: React.FC<NavButtonProps> = ({ icon, onClick, isActive }) => {
  return (
    <button 
      onClick={onClick}
      className={`
        flex items-center justify-center
        w-12 h-12
        rounded-full
        transition-all duration-200
        
        ${isActive ? 'bg-white/20' : 'hover:bg-white/10'}

        ${isActive ? 'opacity-100' : 'opacity-70'}
      `}
    >
      {icon}
    </button>
  );
};

export default NavButton;