// components/lib/ScoringHeader.tsx

import React from 'react';
import BackButton from './BackButton'; 
import Badge from './Badge';         

interface ScoringHeaderProps {
  userName: string;
  round: number | string;
}

const ScoringHeader: React.FC<ScoringHeaderProps> = ({ userName, round }) => {
  return (
    <header 
      className="
        bg-[#AE6924]  
        p-[30px]          
        w-full
        flex 
        items-center 
        justify-between 
      "
    >
      
      <div className="flex items-center gap-[33px]"> 
        <BackButton />
        <h1 className="text-white text-2xl font-semibold">
          {userName}
        </h1>
      </div>

      <Badge>
        Ronde {round}
      </Badge>

    </header>
  );
};

export default ScoringHeader;