'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Star, Users, Wifi, Music, Zap, ShieldCheck, 
  MapPin, Calendar, Clock, ArrowRight, CheckCircle2 
} from 'lucide-react';
import { Button } from '@/components/shared/Button';
import { Card } from '@/components/shared/Card';

// Type definition based on your dummy data
interface PartyBusData {
  page_id: number;
  title: string;
  description: string;
  image_url: string;
  features: string;
  rating: string;
  capacity?: string; // Optional since it wasn't in original dummy data, but useful
  price_start?: string; // Mock price
}

export default function PartyBusDetailView({ bus }: { bus: PartyBusData }) {
  // Parse features string into array
  const featuresList = bus.features ? bus.features.split(',').map(f => f.trim()) : [];

  return (
    <main className="min-h-screen bg-dark">
      
      {/* 1. IMMERSIVE HERO SECTION */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-transparent z-10" />
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8 }}
          src={bus.image_url}
          alt={bus.title}
          className="w-full h-full object-cover"
        />
        
        <div className="absolute bottom-0 left-0 right-0 z-20 pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-primary px-3 py-1 rounded-full text-black font-bold text-sm uppercase tracking-wide">
                  Premium Fleet
                </span>
                <div className="flex items-center bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-white">
                  <Star className="w-4 h-4 text-primary fill-primary mr-1" />
                  <span className="font-semibold">{bus.rating}</span>
                  <span className="text-gray-400 text-sm ml-1">(124 Reviews)</span>
                </div>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                {bus.title}
              </h1>
            </motion.div>
          </div>
        </div>
      </div>

      {/* 2. MAIN CONTENT LAYOUT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          
          {/* LEFT COLUMN: Details (occupies 2/3 width) */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Description */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold text-grey-pastel mb-4">About this Vehicle</h2>
              <p className="text-grey-medium text-lg leading-relaxed">
                {bus.description}
                <br /><br />
                Whether you are planning a wedding, a corporate outing, or a night on the town, 
                the {bus.title} offers the perfect blend of style and comfort. Our professional 
                chauffeurs ensure you arrive safely and on time, while you enjoy the premium amenities inside.
              </p>
            </motion.div>

            {/* Features Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold text-grey-pastel mb-6">Premium Amenities</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {featuresList.map((feature, idx) => (
                  <div key={idx} className="flex items-center p-4 rounded-xl bg-dark-charcoal border border-dark-lighter">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                      {/* Dynamic Icon Logic based on keyword */}
                      {feature.toLowerCase().includes('sound') ? <Music className="w-5 h-5 text-primary" /> :
                       feature.toLowerCase().includes('wifi') ? <Wifi className="w-5 h-5 text-primary" /> :
                       feature.toLowerCase().includes('light') ? <Zap className="w-5 h-5 text-primary" /> :
                       <CheckCircle2 className="w-5 h-5 text-primary" />}
                    </div>
                    <span className="text-grey-pastel font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Gallery Grid (Mocked using the same image for demo) */}
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold text-grey-pastel mb-6">Interior Gallery</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[1, 2, 3].map((item) => (
                   <div key={item} className="aspect-square rounded-xl overflow-hidden bg-dark-charcoal group cursor-pointer">
                     <img 
                        src={bus.image_url} 
                        alt="Gallery" 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-80 group-hover:opacity-100" 
                     />
                   </div>
                ))}
              </div>
            </motion.div>

          </div>

          {/* RIGHT COLUMN: Sticky Booking Card (occupies 1/3 width) */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card padding="lg" className="border-primary/20 shadow-xl shadow-primary/5">
                <div className="mb-6">
                  <p className="text-grey-medium text-sm">Starting from</p>
                  <div className="flex items-end gap-2">
                    <span className="text-3xl font-bold text-white">$150</span>
                    <span className="text-grey-medium mb-1">/ hour</span>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center text-sm text-grey-medium">
                    <Users className="w-4 h-4 mr-3 text-primary" />
                    <span>Up to 30 Passengers</span>
                  </div>
                  <div className="flex items-center text-sm text-grey-medium">
                    <ShieldCheck className="w-4 h-4 mr-3 text-primary" />
                    <span>Verified Professional Chauffeur</span>
                  </div>
                  <div className="flex items-center text-sm text-grey-medium">
                    <MapPin className="w-4 h-4 mr-3 text-primary" />
                    <span>Available in DMV Area</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button variant="primary" fullWidth size="lg">
                    Request a Quote
                  </Button>
                  <Button variant="outline" fullWidth>
                    Check Availability
                  </Button>
                </div>

                <div className="mt-6 pt-6 border-t border-dark-lighter text-center">
                  <p className="text-xs text-grey-dark">
                    Free cancellation up to 48 hours before trip.
                  </p>
                </div>
              </Card>

              {/* Need Help Box */}
              <div className="mt-6 bg-dark-charcoal p-4 rounded-xl border border-dark-lighter flex items-start gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                   <Calendar className="w-5 h-5 text-primary" />
                </div>
                <div>
                   <h4 className="text-white font-medium text-sm">Planning an Event?</h4>
                   <p className="text-xs text-grey-medium mt-1">
                     Call us at (555) 123-4567 for custom packages.
                   </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </main>
  );
}