export interface TourCompanyHeader {
  heading: string;
  subheading: string;
}
export interface CityTour {
  page_id: number;
  title: string;
  subheading: string;
  image_url: string;
  image_title: string;
  price: string;
  capacity: string;
  rating: string;
  link: string;
}

export interface CityToursData {
  tour_companies: TourCompanyHeader;
  city_tours: CityTour[];
}

export interface CityToursApiResponse {
  status: string;
  message: string;
  data: CityToursData;
}



const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getCityToursData(): Promise<CityToursData | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/get-all-tours`, { 
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch city tours: ${res.status}`);
    }
    const json: CityToursApiResponse = await res.json();
    return json.data;
  } catch (error) {
    console.error("Error fetching city tours data:", error);
    return null;
  }
}