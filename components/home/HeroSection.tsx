'use client';
import { motion } from 'framer-motion';
import { BookingWidget } from '../booking/BookingWidget';
import Link from 'next/link';
import { Button } from '../shared/Button';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { Modal } from '../shared/Modal';
import { ListVehicleForm } from './ListVehicleForm';


type HeroSectionProps = {
  hero:{
    background_image: string;
  }
};
export function HeroSection({hero}:HeroSectionProps) {
  const [isListVehicleModalOpen, setIsListVehicleModalOpen] = useState(false)
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={hero.background_image ||"https://images.unsplash.com/photo-1563720360172-67b8f3dce741?w=1920&h=1080&fit=crop&q=80"}
          alt="Background Image"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-r from-black/90 via-black/70 to-transparent" />
      </div>

      {/* Content - Larger Booking Widget */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          

          <h1 className="text-3xl sm:text-5xl lg:text-7xl font-black text-white leading-tight tracking-tighter mb-8 italic uppercase">
            WE KEEP YOU <br />
            <span className="text-primary">MOVING</span>
          </h1>

          <div className="flex flex-wrap gap-4">
            <Link href="/limo-booking">
              <Button 
                variant="primary" 
                size="lg" 
                className="group rounded-full px-10 py-5 text-lg font-bold uppercase tracking-widest shadow-xl shadow-primary/20 transition-all hover:shadow-primary/40 hover:-translate-y-1"
              >
                Book Now
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
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