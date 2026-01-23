'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { StarIcon, CarIcon } from 'lucide-react';
import { VehicleCard, ApiVehicle } from '@/components/marketplace/VehicleCard';
import Link from 'next/link';


const API_DATA: { vehicles: ApiVehicle[] } = {
  "vehicles": [
      {
          "page_id": 226,
          "title": "Luxury Sedan",
          "subheading": "Rolls Royce Phantom",
          "image_url": "https://luxride.niishcloud.com/wp-content/uploads/2026/01/homepage-bg.jpg",
          "image_title": "homepage-bg",
          "price": "-2",
          "capacity": "5",
          "rating": "5",
          "link": "https://luxride.niishcloud.com/vehicle/luxury-sedan/"
      },
      {
          "page_id": 222,
          "title": "Party Bus",
          "subheading": "Mercedes Sprinter Party Bus",
          "image_url": "https://luxride.niishcloud.com/wp-content/uploads/2026/01/photo-1570125909232-eb263c188f7e.jpg",
          "image_title": "photo-1570125909232-eb263c188f7e",
          "price": "",
          "capacity": "14",
          "rating": "4.8",
          "link": "https://luxride.niishcloud.com/vehicle/party-bus/"
      },
      {
          "page_id": 206,
          "title": null,
          "subheading": null,
          "image_url": "",
          "image_title": "",
          "price": null,
          "capacity": null,
          "rating": "5.0",
          "link": "https://luxride.niishcloud.com/vehicle/luxury-suv/"
      },
      {
          "page_id": 196,
          "title": "Stretch Limo",
          "subheading": "Lincoln Continental Stretch",
          "image_url": "https://luxride.niishcloud.com/wp-content/uploads/2026/01/Stretch-Limousine.jpg",
          "image_title": "Stretch-Limousine",
          "price": "150",
          "capacity": "8",
          "rating": "5",
          "link": "https://luxride.niishcloud.com/vehicle/stretch-limousine/"
      }
  ]
};

export default function LimoBookingPage() {
  const [filterCategory, setFilterCategory] = useState('All');
  
  // --- MODAL STATE ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<ApiVehicle | null>(null);

  const handleOpenBooking = (vehicle: ApiVehicle) => {
    setSelectedVehicle(vehicle);
    setIsModalOpen(true);
  };

  // --- FILTERING LOGIC ---
  const cleanedFleet = useMemo(() => {
    return API_DATA.vehicles
      .filter(v => v.title && v.subheading && v.image_url)
      .filter(v => filterCategory === 'All' || v.title === filterCategory);
  }, [filterCategory]);

  const categories = ['All', ...Array.from(new Set(API_DATA.vehicles.map(v => v.title).filter(Boolean) as string[]))];

  return (
    <main className="min-h-screen bg-dark">
      
      {/* HERO SECTION */}
      <section className="relative pt-48 pb-16 md:pt-52 lg:pt-60 lg:pb-24 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] bg-primary/10 blur-[120px] rounded-full -z-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6">
              <StarIcon className="w-3 h-3 text-primary" />
              <span className="text-xs font-medium text-grey-pastel tracking-wider uppercase">Premium Fleet Selection</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
              Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">Experience</span>
            </h1>
            <p className="text-lg text-grey-medium max-w-2xl mx-auto leading-relaxed">
              Explore our exclusive collection of luxury vehicles. 
              Meticulously maintained for your comfort and style.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CONTENT SECTION */}
      <section className="pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-6 py-2 rounded-full text-sm transition-all duration-300 ${
                  filterCategory === cat 
                    ? 'bg-primary text-black font-semibold shadow-lg shadow-primary/20' 
                    : 'bg-dark-charcoal text-grey-medium hover:bg-dark-lighter hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Vehicle Grid */}
             
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {cleanedFleet.map((vehicle, index) => (
              <VehicleCard 
                key={vehicle.page_id} 
                vehicle={vehicle} 
                index={index} 
                onBook={handleOpenBooking} // Pass the handler
              />
            ))}
          </div>
        

          {/* Empty State Warning */}
          {cleanedFleet.length === 0 && (
            <div className="text-center py-20 bg-dark-charcoal/50 rounded-2xl border border-dashed border-white/10">
              <CarIcon className="w-12 h-12 text-grey-medium mx-auto mb-4 opacity-50" />
              <p className="text-grey-medium">No vehicles found in this category.</p>
            </div>
          )}
        </div>
      </section>


      
    </main>
  );
}