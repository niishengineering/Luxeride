'use client';

import { useState } from 'react';
import { BookingFormsModal } from './BookingFormsModal';

export function HomeClient() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingModalTab, setBookingModalTab] =
    useState<'limo' | 'logistics'>('limo');

  const openBookingModal = (tab: 'limo' | 'logistics') => {
    setBookingModalTab(tab);
    setIsBookingModalOpen(true);
  };

  return (
    <BookingFormsModal
      isOpen={isBookingModalOpen}
      onClose={() => setIsBookingModalOpen(false)}
      initialTab={bookingModalTab}
    />
  );
}