'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XIcon, CalendarIcon, MapPinIcon, UserIcon, ClockIcon } from 'lucide-react';
import { Button } from '@/components/shared/Button';
import { ApiVehicle } from './VehicleCard';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  vehicle: ApiVehicle | null;
}

export function BookingModal({ isOpen, onClose, vehicle }: BookingModalProps) {
  const [formData, setFormData] = useState({
    customer_name: '',
    email: '',
    phone: '',
    pickup_date: '',
    pickup_time: '',
    pickup_location: '',
    dropoff_location: '',
    passengers: '1',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !vehicle) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // --- CONSTRUCT THE JSON PAYLOAD ---
    // Merging form data with existing vehicle data
    const finalPayload = {
      service_id: vehicle.page_id.toString(),
      customer_name: formData.customer_name,
      email: formData.email,
      phone: formData.phone,
      service_type: "luxury_transport", // Static or derived
      service_name: `${vehicle.title} - ${vehicle.subheading}`,
      service_description: `Booking for ${vehicle.subheading}`,
      pickup_date: formData.pickup_date,
      pickup_time: formData.pickup_time,
      pickup_location: formData.pickup_location,
      dropoff_location: formData.dropoff_location,
      passengers: formData.passengers,
      vehicle_type: vehicle.title || "Vehicle",
      price: vehicle.price || "Quote",
    };

    console.log("Submitting Booking Payload:", finalPayload);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    alert(`Request sent for ${vehicle.subheading}! Check console for JSON.`);
    setIsSubmitting(false);
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-2xl bg-dark-charcoal border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/5 flex justify-between items-start bg-dark-lighter/50">
              <div>
                <h2 className="text-xl font-bold text-white">Complete Your Booking</h2>
                <p className="text-sm text-primary mt-1">{vehicle.subheading}</p>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors text-grey-medium">
                <XIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Form Area */}
            <div className="p-6 overflow-y-auto custom-scrollbar">
              <form id="booking-form" onSubmit={handleSubmit} className="space-y-6">
                
                {/* Section 1: Contact Details */}
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-grey-pastel uppercase tracking-wider flex items-center gap-2">
                    <UserIcon className="w-4 h-4 text-primary" /> Contact Details
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <InputGroup label="Full Name" name="customer_name" type="text" placeholder="John Doe" required onChange={handleChange} />
                    <InputGroup label="Email" name="email" type="email" placeholder="john@example.com" required onChange={handleChange} />
                    <InputGroup label="Phone" name="phone" type="tel" placeholder="+1 (555) 000-0000" required onChange={handleChange} />
                    <InputGroup 
                      label="Passengers" 
                      name="passengers" 
                      type="number" 
                      max={vehicle.capacity || 4} 
                      min={1} 
                      placeholder={`Max ${vehicle.capacity}`} 
                      required 
                      onChange={handleChange} 
                    />
                  </div>
                </div>

                <div className="h-px bg-white/5" />

                {/* Section 2: Trip Details */}
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-grey-pastel uppercase tracking-wider flex items-center gap-2">
                    <MapPinIcon className="w-4 h-4 text-primary" /> Trip Details
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <InputGroup 
                      label="Pickup Date" 
                      name="pickup_date" 
                      type="date" 
                      icon={<CalendarIcon className="w-4 h-4" />}
                      required 
                      onChange={handleChange} 
                    />
                    <InputGroup 
                      label="Pickup Time" 
                      name="pickup_time" 
                      type="time" 
                      icon={<ClockIcon className="w-4 h-4" />}
                      required 
                      onChange={handleChange} 
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <InputGroup label="Pickup Location" name="pickup_location" type="text" placeholder="e.g. Dulles Airport" required onChange={handleChange} />
                    <InputGroup label="Dropoff Location" name="dropoff_location" type="text" placeholder="e.g. Downtown DC" required onChange={handleChange} />
                  </div>
                </div>

              </form>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-white/5 bg-dark-lighter/30 flex justify-end gap-3">
              <button 
                type="button"
                onClick={onClose}
                className="px-6 py-3 rounded-xl text-sm font-medium text-grey-medium hover:text-white transition-colors"
              >
                Cancel
              </button>
              <Button 
                form="booking-form" // links to form ID
                variant="primary" 
                disabled={isSubmitting}
                className="min-w-35"
              >
                {isSubmitting ? 'Processing...' : 'Confirm Request'}
              </Button>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}


function InputGroup({ label, icon, ...props }: any) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs text-grey-medium font-medium ml-1">{label}</label>
      <div className="relative">
        <input 
          {...props}
          className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-grey-dark focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all"
        />
        {icon && <div className="absolute right-3 top-3 text-grey-medium pointer-events-none">{icon}</div>}
      </div>
    </div>
  );
}