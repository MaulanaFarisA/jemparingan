"use server";

import supabase from '@/components/lib/db';
import { revalidatePath } from "next/cache";

type AddScoreParams = {
  lombaId: number;
  panahIdentifier: number;
  skor: number;
  bandulId?: number;
};

type ActionResponse = {
  success: boolean;
  message: string;
  data?: any; 
};

export async function addScore({ 
  lombaId, 
  panahIdentifier, 
  skor, 
  bandulId 
}: AddScoreParams): Promise<ActionResponse> {
  
  const { data: activeRound } = await supabase
    .from('rambahan')
    .select('rambahan_id')
    .eq('lomba_id', lombaId)
    .is('finish_time', null) 
    .single();

  if (!activeRound) {
    return { success: false, message: "Gagal: Admin belum memulai ronde di database!" };
  }

  const { data, error } = await supabase
    .from('skor_panah')
    .insert({
      rambahan_id: activeRound.rambahan_id,
      panah_id: panahIdentifier,
      skor: skor,
      bandul_id: bandulId
    })
    .select()
    .single();

  if (error) {
    return { success: false, message: error.message };
  }

  revalidatePath(`/lomba/${lombaId}`); 
  
  return { success: true, message: "Skor berhasil disimpan!", data };
}