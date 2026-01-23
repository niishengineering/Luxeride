import React from 'react';
import PartyBusDetailView from '@/components/parties/PartyBusDetailView';
import { notFound } from 'next/navigation';

// Mock Data Source
const DUMMY_DATA = [
  {
    page_id: 250,
    title: "VIP Cruz Bus",
    description: "Experience the ultimate VIP treatment with our flagship Cruz Bus. Perfect for weddings and corporate events.",
    image_url: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1920&q=80",
    features: "VIP Section, Surround Sound, LED Lighting, Mini Bar, Privacy Partition",
    rating: "5.0"
  },
  {
    page_id: 246,
    title: "Luxury Private Ride",
    description: "Intimate luxury for smaller groups. Features plush interiors and high-end privacy amenities.",
    image_url: "https://images.unsplash.com/photo-1554672408-730436b60dde?w=1920&q=80",
    features: "USB Charging Ports, Privacy Tint, Reclining Seats, Climate Control",
    rating: "5.0"
  },
  {
    page_id: 243,
    title: "Grand Tour Party Bus",
    description: "The life of the party on wheels. Spacious dance floor and premium leather seating for unmatched comfort.",
    image_url: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=1920&q=80",
    features: "Leather Seating, Dance Pole, 4K TV Screens, Bluetooth Audio",
    rating: "5.0"
  }
];

interface PageProps {
  params: Promise<{ id: string }>; // <--- Changed to Promise for Next.js 15+
}

export default async function Page({ params }: PageProps) {
  // 1. Await the params (Required in Next.js 15)
  const resolvedParams = await params;
  const busId = parseInt(resolvedParams.id);
  
  // 2. Find the bus
  const bus = DUMMY_DATA.find((item) => item.page_id === busId);

  // 3. Handle 404
  if (!bus) {
    return (
        <div className="min-h-screen bg-dark pt-24 text-center text-white">
            <h1 className="text-3xl font-bold mb-4">Vehicle Not Found</h1>
            <p className="text-grey-medium">The ID {busId} does not exist in our fleet.</p>
        </div>
    );
  }

  // 4. Render the View
  return <PartyBusDetailView bus={bus} />;
}