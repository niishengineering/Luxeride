
import React from 'react';
import { getPartiesPageData } from '@/lib/api/parties';
import PartyView from '@/components/parties/PartyView';
export default async function Page() {
  let data = null;
  let error = false;

  try {
    const response = await getPartiesPageData();
    if (response.status === 'success') {
      data = response.data;
    } else {
      error = true;
    }
  } catch (e) {
    console.error("Failed to fetch party page data:", e);
    error = true;
  }

  if (error || !data) {
    return 
  
  }
  return <PartyView initialData={data} />;
}