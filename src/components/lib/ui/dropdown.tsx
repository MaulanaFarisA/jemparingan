"use client";

import { Button } from "@/components/lib/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

export interface SelectDropdownProps<T extends string | number> {
  label: string;
  options: T[];
  value: T | null;
  onSelect: (value: T) => void;
  disabled?: boolean;
}

export default function SelectDropdown<T extends string | number>({
  label,
  options,
  value,
  onSelect,
  disabled = false,
}: SelectDropdownProps<T>) {
  return (
    <div className="flex flex-col">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className="!bg-[#D9D9D9] !text-[#000000ba] font-bold text-sm w-[319px] h-11 justify-between"
            disabled={disabled}
          >
            {value ?? label}
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-full">
          {options.length === 0 ? (
            <DropdownMenuItem disabled>Tidak ada pilihan</DropdownMenuItem>
          ) : (
            options.map((opt, idx) => (
              <DropdownMenuItem key={idx} onClick={() => onSelect(opt)}>
                {opt}
              </DropdownMenuItem>
            ))
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
