'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Modal } from '../shared/Modal';
import { ListVehicleForm } from './ListVehicleForm';
import { RideFlow } from '../booking/RideFlow';
import { TripTracking } from '../booking/TripTracking';
import { useBookingStore } from '@/lib/store/useBookingStore';
import { useAuthStore } from '@/lib/store/useAuthStore';
import { Sparkles, Star } from 'lucide-react';

type HeroSectionProps = {
  hero: {
    background_image: string;
  }
};

export function HeroSection({ hero }: HeroSectionProps) {
  const [isListVehicleModalOpen, setIsListVehicleModalOpen] = useState(false);
  const { activeTrip, step } = useBookingStore();
  const { user } = useAuthStore();

  return (
    <section className="relative min-h-[90vh] flex items-center pt-24 pb-20 overflow-hidden">
      {/* Background with advanced overlays */}
      <div className="absolute inset-0 z-0">
        <img
          src={hero.background_image || "https://images.unsplash.com/photo-1563720360172-67b8f3dce741?w=1920&h=1080&fit=crop&q=80"}
          alt="Luxury Ride"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
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
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span className="text-[10px] uppercase font-bold text-primary tracking-widest">The Ultimate Travel Experience</span>
            </div>
            
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold text-grey-pastel leading-tight tracking-tight">
                Luxury <span className="text-gradient">Redefined</span>,<br/>
                Every Journey.
              </h1>
              <p className="text-lg text-grey-medium max-w-lg mx-auto lg:mx-0 leading-relaxed font-medium">
                Experience the pinnacle of sophisticated travel with Luxeride. 
                Premium vehicles, professional chauffeurs, and real-time precision.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
               <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-black bg-dark-lighter overflow-hidden">
                       <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" />
                    </div>
                  ))}
                  <div className="w-10 h-10 rounded-full border-2 border-black bg-primary flex items-center justify-center text-black text-xs font-bold">
                    +2k
                  </div>
               </div>
               <div className="text-left">
                  <div className="flex text-primary">
                     {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="w-3 h-3 fill-primary" />)}
                  </div>
                  <p className="text-[10px] text-grey-medium font-bold uppercase tracking-wider">Trusted by 2,000+ Premium Travelers</p>
               </div>
            </div>

            <div className="pt-4 border-t border-white/5 inline-block">
               <p className="text-grey-medium text-sm">
                Own a luxury vehicle?{' '}
                <button
                  onClick={() => setIsListVehicleModalOpen(true)}
                  className="text-primary font-bold hover:underline underline-offset-4 decoration-primary/50 transition-all"
                >
                  List it on our platform
                </button>
              </p>
            </div>
          </motion.div>

          {/* Right Column: Dynamic Booking Interface */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full"
          >
            {activeTrip && step === 4 ? (
              <TripTracking />
            ) : (
              <RideFlow />
            )}
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
    </section>
  );
}