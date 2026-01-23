import React from 'react';
import { Card } from '../shared/Card';
import { Button } from '../shared/Button';
import { UsersIcon } from 'lucide-react';
import { ImageCarousel } from '../listing/ImageCarousel';
type PartyBusCardProps = {
  name: string;
  images: string[];
  capacity: number;
  pricePerHour: number;
  amenities: string[];
  onReserve: () => void;
};
export function PartyBusCard({
  name,
  images,
  capacity,
  pricePerHour,
  amenities,
  onReserve
}: PartyBusCardProps) {
  return <Card padding="none" className="overflow-hidden">
      <div className="h-64">
        <ImageCarousel images={images} autoPlay={false} />
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-2xl font-bold text-grey-pastel">{name}</h3>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary">
              ${pricePerHour}
            </div>
            <div className="text-xs text-grey-medium">per hour</div>
          </div>
        </div>

        <div className="flex items-center space-x-2 mb-6 text-grey-pastel bg-dark-lighter p-2 rounded-lg inline-block">
          <UsersIcon className="w-5 h-5 text-primary" />
          <span className="font-medium">Up to {capacity} Guests</span>
        </div>

        <div className="mb-6">
          <h4 className="text-sm font-semibold text-grey-medium mb-3 uppercase tracking-wider">
            Amenities
          </h4>
          <div className="grid grid-cols-2 gap-3">
            {amenities.map((amenity, index) => <div key={index} className="flex items-center text-sm text-grey-pastel">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2" />
                {amenity}
              </div>)}
          </div>
        </div>

        <Button variant="primary"className='mt-8'fullWidth size="lg" onClick={onReserve}>
          Reserve This Bus
        </Button>
      </div>
    </Card>;
}