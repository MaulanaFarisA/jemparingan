// components/lib/ui/Avatar.tsx

import React from 'react';
import Image from 'next/image';

interface AvatarProps {
  src?: string | null; 
  alt: string;
}

const Avatar: React.FC<AvatarProps> = ({ src, alt }) => {
  const sizeClass = "w-[42px] h-[42px]"; 

  if (src) {
    return (
      <Image
        src={src}
        alt={alt}
        width={42}
        height={42}
        className={`rounded-full object-cover ${sizeClass}`}
      />
    );
  }

  return (
    <div
      className={`rounded-full bg-gray-300 ${sizeClass}`}
      aria-label={alt}
    />
  );
};

export default Avatar;