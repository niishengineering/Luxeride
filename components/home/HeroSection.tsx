'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Modal } from '../shared/Modal';
import { ListVehicleForm } from './ListVehicleForm';
import { RideFlow } from '../booking/RideFlow';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Button } from '../Button';

const TripTracking = dynamic(() => import('../booking/TripTracking').then(mod => mod.TripTracking), {
  ssr: false,
  loading: () => (
    <div className="h-[450px] w-full rounded-3xl bg-dark-charcoal/50 border border-white/10 flex items-center justify-center backdrop-blur-xl">
      <div className="flex flex-col items-center gap-4 text-center p-8">
        <div className="w-12 h-12 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
        <div className="space-y-2">
          <p className="text-white font-bold tracking-tight">Initializing Map</p>
          <p className="text-xs text-grey-medium">Connecting to secure GPS network...</p>
        </div>
      </div>
    </div>
  )
});
import { useBookingStore } from '@/lib/store/useBookingStore';
import { useAuthStore } from '@/lib/store/useAuthStore';
import { Sparkles, Star, ArrowRight } from 'lucide-react';

type HeroSectionProps = {
  hero: {
    background_image: string;
  }
};

export function HeroSection({ hero }: HeroSectionProps) {
  const [isListVehicleModalOpen, setIsListVehicleModalOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const { activeTrip, step } = useBookingStore();
  const { user } = useAuthStore();

  return (
    <section className="relative min-h-[90vh] flex items-center pt-24 pb-20 overflow-hidden">
      {/* Background with advanced overlays */}
      <div className="absolute inset-0 z-0 bg-black">
        <img
          src={hero.background_image || "https://images.unsplash.com/photo-1563720360172-67b8f3dce741?w=1920&h=1080&fit=crop&q=80"}
          alt="Luxury Ride"
          className="w-full h-full object-cover opacity-90"
        />
        {/* Subtle overlay */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center lg:text-left space-y-8"
          >
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl lg:text-[80px] font-black italic text-white leading-tight tracking-tight drop-shadow-lg">
                WE KEEP YOU<br/>
                <span className="text-primary drop-shadow-md">MOVING</span>
              </h1>
              
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                <Link href="/limo-booking">
                  <Button 
                    variant="primary" 
                    size="lg" 
                    className="px-8 py-4 font-bold text-white text-lg flex items-center justify-center gap-2 uppercase tracking-wide w-full sm:w-auto"
                  >
                    Book Now <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
                <Button 
                  onClick={() => setIsBookingModalOpen(true)}
                  variant="outline" 
                  size="lg" 
                  className="px-8 py-4 font-bold text-white border-white/20 hover:bg-white/10 text-lg flex items-center justify-center gap-2 uppercase tracking-wide w-full sm:w-auto backdrop-blur-sm"
                >
                  Request a Ride
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Modal for Listing Vehicle */}
      <Modal
        isOpen={isListVehicleModalOpen}
        onClose={() => setIsListVehicleModalOpen(false)}
        title="List Your Vehicle"
        size="md"
      >
        <ListVehicleForm onSuccess={() => setIsListVehicleModalOpen(false)} />
      </Modal>

      {/* Modal for Booking Ride */}
      <Modal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        title="Request a Ride"
        size="md"
      >
        <RideFlow />
      </Modal>
    </section>
  );
}