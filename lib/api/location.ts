// lib/api/locations.ts

export interface LocationSuggestion {
  display_name: string; 
  lat: string;
  lon: string;
}

export async function fetchLocationSuggestions(query: string): Promise<string[]> {
  if (!query || query.length < 3) return [];

  try {
    // Nominatim requires a User-Agent header identifying your application
    // We restrict results to the US (countrycodes=us) to keep it relevant
    const endpoint = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      query
    )}&countrycodes=us&limit=5&addressdetails=1`;

    const res = await fetch(endpoint, {
      headers: {
        'User-Agent': 'MyChauffeurApp/1.0 (contact@example.com)' // REPLACE with your app name/email
      }
    });

    if (!res.ok) return [];

    const data: LocationSuggestion[] = await res.json();

    // Map the complex OpenStreetMap response to simple strings
    return data.map((item) => item.display_name);
    
  } catch (error) {
    console.error("Error fetching locations:", error);
    return [];
  }
}