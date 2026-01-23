

export interface PartyBus {
  page_id: number;
  title: string;
  description: string;
  image_url: string;
  image_title: string;
  features: string;
  rating: string;
}

export interface PartiesPageData {
  hero_section: {
    heading: string;
    subheading: string;
    background_image: string;
  };
  party_fleet_section: {
    heading: string;
    subheading: string;
  };
  parties_section: PartyBus[];
}

export const getPartiesPageData = async (): Promise<{ status: string; data: PartiesPageData }> => {
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  try {
    const response = await fetch(`${API_BASE_URL}/get-parties-page-data`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store', 
    });

    if (!response.ok) {
      throw new Error('Failed to fetch party page data');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching parties:', error);
    throw error;
  }
};