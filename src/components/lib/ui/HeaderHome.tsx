import React from 'react';
import Avatar from './Avatar';

interface PanitiaHeaderProps {
  userName: string;
  userImage?: string | null;
}

const PanitiaHeader: React.FC<PanitiaHeaderProps> = ({ userName, userImage }) => {
  return (
    <header
      className="
        w-full 
        px-[35px]  
        h-[91px]         
        flex 
        items-center 
        
        justify-start
        
        gap-[17px]        
        bg-cover
        bg-center
        bg-[url('/batik.svg')]
      "
    >
      <Avatar src={userImage} alt={userName} />

      <h1 className="
          text-white 
          text-[22px]   
          font-semibold 
          leading-normal
        ">
        {userName} <span className="uppercase">[PANITIA]</span>
      </h1>
    </header>
  );
};

export default PanitiaHeader;