import Image from 'next/image';
import { Button } from './button';
import Link from 'next/dist/client/link';

export default function PanitiaInput() {
  return (
    <div className="bg-[#D9D9D9] w-90 h-[314px] rounded-2xl px-[22px]">
      <div className="flex flex-col items-center pt-[30px]">
        <Image
          src="/icon/panitia-input-icon.webp"
          alt="Panitia Input Icon"
          width={184}
          height={184}
        />
        <Link href="/scan">
          <Button className='px-[66px] py-4 text-[20px] mt-4 !hover:bg-[#321008]'>Masukkan Nilai</Button>
        </Link>
      </div>
    </div>
  );
}
