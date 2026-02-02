'use client';
import { motion } from 'framer-motion';
import { BookingWidget } from '../booking/BookingWidget';
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
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <BookingWidget />
         <p className="mt-4 text-center md:text-left text-grey-medium text-sm">
  Own a luxury vehicle?{' '}
  <button
    onClick={() => setIsListVehicleModalOpen(true)}
    className="
      inline
      align-baseline
      text-primary
      underline
      underline-offset-2
      hover:text-primary/80
      transition-colors
    "
  >
    List it on our platform
  </button>
</p>
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