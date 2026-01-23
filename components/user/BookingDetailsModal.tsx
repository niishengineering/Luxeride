'use client';

import React from 'react';
import { 
  XIcon, 
  MapPinIcon, 
  CalendarIcon, 
  ClockIcon, 
  UsersIcon, 
  BriefcaseIcon, 
  CheckCircleIcon,
  NavigationIcon
} from 'lucide-react';
import { Button } from '../shared/Button';

export interface BookingData {
  id: number;
  title: string;
  date_created: string;
  status: string;
  service_type: string;
  pickup_location: string;
  dropoff_location: string;
  passengers: string;
  pickup_date: string;
  pickup_time: string;
}

interface BookingDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: BookingData | null;
}

// Helper to format dates neatly
const formatDate = (dateStr: string) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric', 
    year: 'numeric' 
  });
};

// Helper to format time (13:04 -> 1:04 PM)
const formatTime = (timeStr: string) => {
  if (!timeStr) return '';
  const [hours, minutes] = timeStr.split(':');
  const date = new Date();
  date.setHours(Number(hours));
  date.setMinutes(Number(minutes));
  return date.toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit', 
    hour12: true 
  });
};

export function BookingDetailsModal({ isOpen, onClose, booking }: BookingDetailsModalProps) {
  if (!isOpen || !booking) return null;

  // Map "publish" to a user-friendly status
  const isConfirmed = booking.status === 'publish';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-dark-charcoal border border-dark-lighter rounded-2xl shadow-2xl w-full max-w-2xl relative animate-scaleIn overflow-hidden flex flex-col max-h-[90vh]"
        role="dialog"
      >
        {/* --- Header --- */}
        <div className="flex items-center justify-between p-6 border-b border-dark-lighter bg-dark-lighter/30">
          <div>
            <h2 className="text-xl font-bold text-grey-pastel">Trip Details</h2>
            <p className="text-sm text-grey-medium mt-1">
              Booking ID: <span className="font-mono text-primary">#{booking.id}</span>
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-grey-medium hover:text-white transition-colors"
          >
            <XIcon className="w-5 h-5" />
          </button>
        </div>

        {/* --- Scrollable Content --- */}
        <div className="p-6 overflow-y-auto custom-scrollbar space-y-8">
          
          {/* Status & Created Date */}
          <div className="flex flex-wrap items-center justify-between gap-4 bg-dark-lighter rounded-xl p-4 border border-dark-lighter/50">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-full ${isConfirmed ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'}`}>
                {isConfirmed ? <CheckCircleIcon className="w-5 h-5" /> : <ClockIcon className="w-5 h-5" />}
              </div>
              <div>
                <p className="text-sm font-medium text-grey-pastel">Status</p>
                <p className={`text-sm font-bold ${isConfirmed ? 'text-green-400' : 'text-yellow-400'}`}>
                  {isConfirmed ? 'Confirmed' : 'Pending'}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-grey-medium">Request Received</p>
              <p className="text-sm text-grey-pastel font-medium">{formatDate(booking.date_created)}</p>
            </div>
          </div>

          {/* Route Visualizer */}
          <div className="space-y-1 relative">
            {/* Connecting Line */}
            <div className="absolute left-[19px] top-8 bottom-8 w-0.5 bg-gradient-to-b from-primary/50 to-primary/10 border-l border-dashed border-primary/30 z-0"></div>

            {/* Pickup */}
            <div className="flex items-start gap-4 relative z-10">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20 shadow-[0_0_15px_rgba(var(--primary-rgb),0.2)]">
                <MapPinIcon className="w-5 h-5 text-primary" />
              </div>
              <div className="pt-1">
                <p className="text-xs font-bold text-primary uppercase tracking-wider mb-1">Pickup Location</p>
                <p className="text-base text-white font-medium leading-tight">{booking.pickup_location}</p>
              </div>
            </div>

            {/* Spacer for visual breathing room */}
            <div className="h-6"></div>

            {/* Dropoff */}
            <div className="flex items-start gap-4 relative z-10">
              <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center shrink-0 border border-red-500/20">
                <NavigationIcon className="w-5 h-5 text-red-400" />
              </div>
              <div className="pt-1">
                <p className="text-xs font-bold text-red-400 uppercase tracking-wider mb-1">Dropoff Destination</p>
                <p className="text-base text-white font-medium leading-tight">{booking.dropoff_location}</p>
              </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-4">
            
            {/* Date */}
            <div className="bg-dark-lighter p-4 rounded-xl border border-dark-lighter/50 hover:border-primary/30 transition-colors">
              <div className="flex items-center gap-2 mb-2">
                <CalendarIcon className="w-4 h-4 text-grey-medium" />
                <span className="text-xs text-grey-medium font-medium">Date</span>
              </div>
              <p className="text-lg text-grey-pastel font-semibold">{formatDate(booking.pickup_date)}</p>
            </div>

            {/* Time */}
            <div className="bg-dark-lighter p-4 rounded-xl border border-dark-lighter/50 hover:border-primary/30 transition-colors">
              <div className="flex items-center gap-2 mb-2">
                <ClockIcon className="w-4 h-4 text-grey-medium" />
                <span className="text-xs text-grey-medium font-medium">Time</span>
              </div>
              <p className="text-lg text-grey-pastel font-semibold">{formatTime(booking.pickup_time)}</p>
            </div>

            {/* Passengers */}
            <div className="bg-dark-lighter p-4 rounded-xl border border-dark-lighter/50 hover:border-primary/30 transition-colors">
              <div className="flex items-center gap-2 mb-2">
                <UsersIcon className="w-4 h-4 text-grey-medium" />
                <span className="text-xs text-grey-medium font-medium">Passengers</span>
              </div>
              <p className="text-lg text-grey-pastel font-semibold">{booking.passengers} People</p>
            </div>

            {/* Service Type */}
            <div className="bg-dark-lighter p-4 rounded-xl border border-dark-lighter/50 hover:border-primary/30 transition-colors">
              <div className="flex items-center gap-2 mb-2">
                <BriefcaseIcon className="w-4 h-4 text-grey-medium" />
                <span className="text-xs text-grey-medium font-medium">Service</span>
              </div>
              <p className="text-lg text-grey-pastel font-semibold capitalize">
                {booking.service_type.replace('-', ' ')}
              </p>
            </div>
          </div>

        </div>

        {/* --- Footer --- */}
        <div className="p-6 border-t border-dark-lighter bg-dark-lighter/30 flex justify-end">
          <Button onClick={onClose} variant="outline" className="min-w-[120px]">
            Close
          </Button>
        </div>

      </div>
    </div>
  );
}