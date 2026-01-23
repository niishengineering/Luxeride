'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/shared/Button';
import { Card } from '@/components/shared/Card';
import {
  StarIcon,
  UsersIcon,
  ArrowLeftIcon,
  CheckCircleIcon,
  ExternalLinkIcon,
  DollarSignIcon,
  InfoIcon
} from 'lucide-react';

// Interface matching your JSON
interface ApiTourData {
  page_id: string;
  title: string;
  subheading: string;
  image_url: string;
  image_title: string;
  price: string;
  capacity: string;
  rating: string;
  link: string;
}

export default function TourDetailPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<ApiTourData | null>(null);

  useEffect(() => {
    // Simulating API Fetch
    const fetchData = () => {
      const apiResponse = {
        "status": "success",
        "data": {
            "page_id": "286",
            "title": "Segway Tours DC",
            "subheading": "", 
            "image_url": "https://luxride.niishcloud.com/wp-content/uploads/2026/01/Segway-Tours-DC.jpg",
            "image_title": "Segway Tours DC",
            "price": "70",
            "capacity": "5",
            "rating": "4.6",
            "link": "https://luxride.niishcloud.com/city_tour/segway-tours-dc/"
        }
      };

      if (apiResponse.status === 'success') {
        setData(apiResponse.data);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
          <span className="text-grey-medium">Loading experience...</span>
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <main className="min-h-screen bg-dark pb-24">
      {/* 1. IMMERSIVE HERO SECTION */}
      <div className="relative h-[60vh] min-h-[500px] w-full">
        {/* Background Image with Gradient Overlay */}
        <div className="absolute inset-0">
          <img
            src={data.image_url}
            alt={data.image_title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-dark/60 via-transparent to-dark" />
        </div>

        {/* Back Button (Floating) */}
        <div className="absolute top-24 left-0 right-0 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-20">
          <button
            onClick={() => router.push('/city-tours')}
            className="flex items-center space-x-2 text-white/80 hover:text-primary bg-black/30 hover:bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full transition-all duration-300"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            <span className="text-sm font-medium">Back to Tours</span>
          </button>
        </div>

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 px-4 sm:px-6 lg:px-8 pb-12 z-20">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center space-x-2 text-primary font-bold tracking-wider uppercase text-sm mb-2">
                <StarIcon className="w-4 h-4 fill-primary" />
                <span>{data.rating} Rated Experience</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4 leading-tight">
                {data.title}
              </h1>
              <p className="text-xl text-grey-pastel/90 max-w-2xl">
                {data.subheading || `Discover the city with our premium ${data.title} package.`}
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* 2. MAIN CONTENT GRID */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-30">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* LEFT COLUMN: Details (Span 2) */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Quick Stats Bar */}
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.2 }}
               className="bg-dark-charcoal border border-white/5 rounded-2xl p-6 flex flex-wrap gap-8 items-center justify-between shadow-xl"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-full text-primary">
                  <UsersIcon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-grey-medium uppercase tracking-wide">Capacity</p>
                  <p className="text-lg font-bold text-white">{data.capacity} People</p>
                </div>
              </div>
              
              <div className="h-8 w-px bg-white/10 hidden sm:block"></div>

              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-full text-primary">
                  <StarIcon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-grey-medium uppercase tracking-wide">Rating</p>
                  <p className="text-lg font-bold text-white">{data.rating} / 5.0</p>
                </div>
              </div>

              <div className="h-8 w-px bg-white/10 hidden sm:block"></div>

              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-full text-primary">
                  <DollarSignIcon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-grey-medium uppercase tracking-wide">Starting From</p>
                  <p className="text-lg font-bold text-white">${data.price}</p>
                </div>
              </div>
            </motion.div>

            {/* Description Section */}
            <div className="bg-dark-charcoal/50 rounded-2xl p-8 border border-white/5">
              <h2 className="text-2xl font-bold text-grey-pastel mb-6">About this Experience</h2>
              <div className="prose prose-invert max-w-none text-grey-medium leading-relaxed">
                <p>
                  Join us for the {data.title}, a top-rated experience designed for intimate groups of up to {data.capacity} people. 
                  Whether you are a local or a visitor, this tour offers a unique perspective on the city.
                </p>
                <p className="mt-4">
                  Enjoy premium service, expert guidance, and an unforgettable journey. Our customers consistently rate this 
                  experience {data.rating} stars for its quality and value.
                </p>
              </div>

              {/* Highlights (Static for design purposes since generic data doesn't have them) */}
              <div className="mt-8 grid sm:grid-cols-2 gap-4">
                {['Instant Confirmation', 'Professional Guide', 'Safety Equipment', 'Flexible Schedule'].map((item, i) => (
                  <div key={i} className="flex items-center space-x-3 text-grey-pastel">
                    <CheckCircleIcon className="w-5 h-5 text-primary" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Sticky Booking Card (Span 1) */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card className="bg-dark-charcoal border-primary/30 shadow-2xl overflow-hidden relative">
                {/* Decorative top accent */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/50 via-primary to-primary/50"></div>
                
                <div className="p-6 space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-grey-medium">Total Price</h3>
                    <div className="flex items-baseline space-x-2">
                      <span className="text-4xl font-bold text-white">${data.price}</span>
                      <span className="text-sm text-grey-medium">/ per person</span>
                    </div>
                  </div>

                  <div className="p-4 bg-black/20 rounded-lg border border-white/5 space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-grey-medium">Service Fee</span>
                      <span className="text-grey-pastel">Included</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-grey-medium">Confirmation</span>
                      <span className="text-grey-pastel">Instant</span>
                    </div>
                  </div>

                  <a href={data.link} target="_blank" rel="noopener noreferrer" className="block">
                    <Button variant="primary" size="lg" fullWidth className="h-14 text-lg shadow-lg shadow-primary/20">
                      Check Availability
                      <ExternalLinkIcon className="w-5 h-5 ml-2" />
                    </Button>
                  </a>

                  <div className="flex items-center justify-center space-x-2 text-xs text-grey-medium">
                    <InfoIcon className="w-3 h-3" />
                    <span>You will be redirected to our partner site</span>
                  </div>
                </div>
                
                <div className="bg-white/5 p-4 text-center">
                   <p className="text-sm text-grey-medium">
                     <span className="text-primary font-bold">Free cancellation</span> up to 24h before
                   </p>
                </div>
              </Card>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}