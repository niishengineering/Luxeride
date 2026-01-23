'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Modal } from '../shared/Modal';
import { Button } from '../shared/Button';
import { Input } from '../shared/Input';
import { CarIcon, TruckIcon, CheckCircleIcon } from 'lucide-react';

type BookingFormsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'limo' | 'logistics';
};

const vehicleOptions = [
  { value: 'stretch', label: 'Stretch Limousine' },
  { value: 'suv', label: 'Luxury SUV' },
  { value: 'party-bus', label: 'Party Bus' },
  { value: 'sedan', label: 'Luxury Sedan' },
  { value: 'vintage', label: 'Vintage/Classic Car' }
];

export function BookingFormsModal({
  isOpen,
  onClose,
  initialTab = 'limo'
}: BookingFormsModalProps) {
  const [activeTab, setActiveTab] = useState<'limo' | 'logistics'>(initialTab);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [limoForm, setLimoForm] = useState({
    date: '',
    pickup: '',
    destination: '',
    vehicle: '',
    name: '',
    email: '',
    phone: ''
  });

  const [logisticsForm, setLogisticsForm] = useState({
    cargo: '',
    pickup: '',
    delivery: '',
    date: '',
    name: '',
    email: '',
    phone: ''
  });

  const handleLimoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Limo Booking:', limoForm);
    // Add your API call here (e.g., fetch('/api/booking', ...))
    setIsSubmitted(true);
  };

  const handleLogisticsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Logistics Quote:', logisticsForm);
    // Add your API call here
    setIsSubmitted(true);
  };

  const handleClose = () => {
    setIsSubmitted(false);
    onClose();
  };

  // Success State
  if (isSubmitted) {
    return (
      <Modal isOpen={isOpen} onClose={handleClose} size="md">
        <div className="text-center py-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', duration: 0.5 }}
          >
            <CheckCircleIcon className="w-20 h-20 text-primary mx-auto mb-6" />
          </motion.div>
          <h3 className="text-2xl font-bold text-grey-pastel mb-4">
            Request Submitted!
          </h3>
          <p className="text-grey-medium mb-8">
            Thank you for your{' '}
            {activeTab === 'limo' ? 'booking request' : 'quote request'}. Our
            team will contact you within 24 hours.
          </p>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </div>
      </Modal>
    );
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Request a Quote" size="xl">
      {/* Tab Switcher */}
      <div className="flex space-x-2 mb-8 p-1 bg-dark-lighter rounded-lg">
        <button
          onClick={() => setActiveTab('limo')}
          className={`
            flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-all
            ${activeTab === 'limo' ? 'bg-primary text-black' : 'text-grey-medium hover:text-grey-pastel'}
          `}
        >
          <CarIcon className="w-5 h-5" />
          <span>Book a Limo</span>
        </button>
        <button
          onClick={() => setActiveTab('logistics')}
          className={`
            flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-all
            ${activeTab === 'logistics' ? 'bg-primary text-black' : 'text-grey-medium hover:text-grey-pastel'}
          `}
        >
          <TruckIcon className="w-5 h-5" />
          <span>Logistics Quote</span>
        </button>
      </div>

      {/* Limo Form */}
      {activeTab === 'limo' && (
        <motion.form
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onSubmit={handleLimoSubmit}
          className="space-y-6"
        >
          <div className="grid sm:grid-cols-2 gap-6">
            <Input
              label="Date & Time"
              type="datetime-local"
              value={limoForm.date}
              onChange={(e) => setLimoForm({ ...limoForm, date: e.target.value })}
              required
            />
            <Input
              label="Vehicle Type"
              as="select"
              options={vehicleOptions}
              value={limoForm.vehicle}
              onChange={(e) => setLimoForm({ ...limoForm, vehicle: e.target.value })}
              placeholder="Select a vehicle"
              required
            />
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            <Input
              label="Pickup Location"
              placeholder="Enter pickup address"
              value={limoForm.pickup}
              onChange={(e) => setLimoForm({ ...limoForm, pickup: e.target.value })}
              required
            />
            <Input
              label="Destination"
              placeholder="Enter destination address"
              value={limoForm.destination}
              onChange={(e) => setLimoForm({ ...limoForm, destination: e.target.value })}
              required
            />
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            <Input
              label="Your Name"
              placeholder="Full name"
              value={limoForm.name}
              onChange={(e) => setLimoForm({ ...limoForm, name: e.target.value })}
              required
            />
            <Input
              label="Email"
              type="email"
              placeholder="your@email.com"
              value={limoForm.email}
              onChange={(e) => setLimoForm({ ...limoForm, email: e.target.value })}
              required
            />
            <Input
              label="Phone"
              type="tel"
              placeholder="(202) 555-1234"
              value={limoForm.phone}
              onChange={(e) => setLimoForm({ ...limoForm, phone: e.target.value })}
              required
            />
          </div>
          <Button type="submit" variant="primary" fullWidth size="lg">
            Submit Booking Request
          </Button>
        </motion.form>
      )}

      {/* Logistics Form */}
      {activeTab === 'logistics' && (
        <motion.form
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          onSubmit={handleLogisticsSubmit}
          className="space-y-6"
        >
          <Input
            label="Cargo Description"
            as="textarea"
            placeholder="Describe your cargo (type, size, weight, special requirements)"
            value={logisticsForm.cargo}
            onChange={(e) => setLogisticsForm({ ...logisticsForm, cargo: e.target.value })}
            rows={3}
            required
          />
          <div className="grid sm:grid-cols-2 gap-6">
            <Input
              label="Pickup Location"
              placeholder="Enter pickup address"
              value={logisticsForm.pickup}
              onChange={(e) => setLogisticsForm({ ...logisticsForm, pickup: e.target.value })}
              required
            />
            <Input
              label="Delivery Location"
              placeholder="Enter delivery address"
              value={logisticsForm.delivery}
              onChange={(e) => setLogisticsForm({ ...logisticsForm, delivery: e.target.value })}
              required
            />
          </div>
          <Input
            label="Preferred Date"
            type="date"
            value={logisticsForm.date}
            onChange={(e) => setLogisticsForm({ ...logisticsForm, date: e.target.value })}
            required
          />
          <div className="grid sm:grid-cols-3 gap-6">
            <Input
              label="Your Name"
              placeholder="Full name"
              value={logisticsForm.name}
              onChange={(e) => setLogisticsForm({ ...logisticsForm, name: e.target.value })}
              required
            />
            <Input
              label="Email"
              type="email"
              placeholder="your@email.com"
              value={logisticsForm.email}
              onChange={(e) => setLogisticsForm({ ...logisticsForm, email: e.target.value })}
              required
            />
            <Input
              label="Phone"
              type="tel"
              placeholder="(202) 555-1234"
              value={logisticsForm.phone}
              onChange={(e) => setLogisticsForm({ ...logisticsForm, phone: e.target.value })}
              required
            />
          </div>
          <Button type="submit" variant="primary" fullWidth size="lg">
            Request Quote
          </Button>
        </motion.form>
      )}
    </Modal>
  );
}