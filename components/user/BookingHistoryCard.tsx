'use client';

import React, { useState } from 'react';
import { Card } from '../shared/Card';
import { Button } from '../shared/Button';
import { ContactAdminModal } from './ContactAdminModal';
import { CalendarIcon, MapPinIcon, ClockIcon, CarIcon } from 'lucide-react';

type BookingStatus = 'upcoming' | 'completed' | 'cancelled';

type BookingHistoryCardProps = {
  id: string;
  service: string;
  date: string;
  time: string;
  pickup: string;
  dropoff: string;
  price: string;
  status: BookingStatus;
  onViewDetails: () => void;
  onModify?: () => void;
  onReview?: () => void;
};

export function BookingHistoryCard({
  id,
  service,
  date,
  time,
  pickup,
  dropoff,
  price,
  status,
  onViewDetails,
  onReview
}: BookingHistoryCardProps) {
  // State to control modal visibility
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  const statusColors = {
    upcoming: 'bg-blue-500/20 text-blue-400',
    completed: 'bg-green-500/20 text-green-400',
    cancelled: 'bg-red-500/20 text-red-400'
  };

  return (
    <>
      <Card className="mb-4">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-grey-pastel text-lg">{service}</h3>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[status]}`}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </span>
            </div>
            <p className="text-xs text-grey-medium mb-4">Booking ID: {id}</p>

            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div className="space-y-2">
                <div className="flex items-center text-sm text-grey-medium">
                  <CalendarIcon className="w-4 h-4 mr-2 text-primary" />
                  {date}
                </div>
                <div className="flex items-center text-sm text-grey-medium">
                  <ClockIcon className="w-4 h-4 mr-2 text-primary" />
                  {time}
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-grey-medium">
                  <MapPinIcon className="w-4 h-4 mr-2 text-primary" />
                  <span className="truncate block w-full max-w-200">{pickup}</span>
                </div>
                <div className="flex items-center text-sm text-grey-medium">
                  <CarIcon className="w-4 h-4 mr-2 text-primary" />
                  <span className="truncate block w-full max-w-50">{dropoff}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between items-end border-t md:border-t-0 md:border-l border-dark-lighter pt-4 md:pt-0 md:pl-6 min-w-40">
            <div className="text-xl font-bold text-primary mb-4">{price}</div>
            <div className="space-y-2 w-full">
              <Button variant="outline" size="sm" fullWidth onClick={onViewDetails}>
                View Details
              </Button>
              
              {status === 'upcoming' && (
                <button 
                  onClick={() => setIsCancelModalOpen(true)} 
                  className="w-full text-xs text-red-400 hover:text-red-300 transition-colors py-1 font-medium"
                >
                  Cancel Booking
                </button>
              )}
              
              {status === 'completed' && (
                <Button variant="primary" size="sm" fullWidth onClick={onReview}>
                  Write Review
                </Button>
              )}
            </div>
          </div>
        </div>
      </Card>
      <ContactAdminModal 
        isOpen={isCancelModalOpen} 
        onClose={() => setIsCancelModalOpen(false)} 
        bookingId={id}
      />
    </>
  );
}