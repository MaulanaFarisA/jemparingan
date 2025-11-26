// components/lib/ScoringHeader.tsx

import React from 'react';
import BackButton from './BackButton';
import Badge from './Badge';

interface ScoringHeaderProps {
  userName: string;
  round: number | string;
  titleClassName?: string;
  gap?: string;
}

const ScoringHeader: React.FC<ScoringHeaderProps> = ({ userName, round, titleClassName, gap = '33px' }) => {
  return (
    <header
      className="
        w-full
        h-[92px]
        bg-[#AE6924]
        px-[30px]
        flex
        items-center
        justify-between
        shrink-0
      "
    >

      <div className="flex items-center" style={{ gap: gap }}>
        <BackButton />
        <h1 className={`text-white text-2xl font-semibold whitespace-nowrap ${titleClassName || ''}`}>
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