'use client';
import { XIcon, PhoneIcon, AlertCircleIcon } from 'lucide-react';
import { Button } from '../shared/Button';

interface ContactAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingId: string;
}
export function ContactAdminModal({ isOpen, onClose, bookingId }: ContactAdminModalProps) {
  if (!isOpen) return null;
  const ADMIN_PHONE = "+1 (555) 123-4567";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-dark-charcoal border border-dark-lighter rounded-2xl shadow-2xl max-w-md w-full p-6 relative animate-scaleIn"
        role="dialog"
      >
        {/* Close Icon */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-grey-medium hover:text-white transition-colors"
        >
          <XIcon className="w-5 h-5" />
        </button>

        {/* Content */}
        <div className="flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mb-4">
            <AlertCircleIcon className="w-6 h-6 text-red-400" />
          </div>

          <h3 className="text-xl font-bold text-grey-pastel mb-2">
            Cancel Booking?
          </h3>
          
          <p className="text-grey-medium text-sm mb-6 leading-relaxed">
            To ensure the best service and handle refunds correctly, cancellations for booking <span className="text-primary font-mono">{bookingId}</span> must be processed by our support team.
          </p>

          <div className="bg-dark-lighter w-full rounded-xl p-4 mb-6 border border-dark-lighter">
            <p className="text-xs text-grey-medium mb-1 uppercase tracking-wider">Support Line</p>
            <a 
              href={`tel:${ADMIN_PHONE}`} 
              className="text-lg font-bold text-white flex items-center justify-center gap-2 hover:text-primary transition-colors"
            >
              <PhoneIcon className="w-5 h-5" />
              {ADMIN_PHONE}
            </a>
          </div>

          <div className="flex w-full gap-3">
            <a href={`tel:${ADMIN_PHONE}`} className="w-full">
              <Button variant="primary" fullWidth>
                Call Now
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}