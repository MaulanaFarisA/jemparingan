import Image from 'next/image';
import { Button } from './button';
import Link from 'next/link';
import { ReactNode } from 'react';

interface PanitiaInputProps {
  title?: string;
  href?: string;
  buttonColor?: string;
  icon?: ReactNode;
}

export default function PanitiaInput({
  title = "Masukkan Nilai",
  href = "/scan",
  buttonColor = "bg-[#9A3E24] hover:bg-[#321008]",
  icon,
}: PanitiaInputProps) {
  return (
    <div className="bg-white border border-gray-200 w-full h-[220px] rounded-[20px] px-4 flex flex-col items-center justify-center shadow-sm">
      <div className="flex flex-col items-center gap-3 w-full">
        
        <div className="flex items-center justify-center h-[100px] w-[100px]">
          {icon ? (
            icon
          ) : (
            <Image
              src="/icon/panitia-input-icon.webp"
              alt="Icon"
              width={100}
              height={100}
              className="object-contain"
            />
          )}
        </div>

        <Link href={href} className="w-full">
          <Button 
            className={`w-full py-3 text-[16px] font-bold rounded-[12px] text-white transition-colors ${buttonColor}`}
          >
            {title}
          </Button>
        </Link>
      </div>
    </div>
  );
}