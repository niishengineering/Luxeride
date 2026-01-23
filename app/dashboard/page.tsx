'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/shared/Button';
import { Card } from '@/components/shared/Card';
import { Modal } from '@/components/shared/Modal';
import { BookingHistoryCard } from '@/components/user/BookingHistoryCard';
import { SavedLocationCard } from '@/components/user/SavedLocationCard';
import { PaymentMethodCard } from '@/components/user/PaymentMethodCard';
import { ReviewForm } from '@/components/user/ReviewForm';
import {  UserIcon,LogOutIcon} from 'lucide-react';
import { useAuthStore } from '@/lib/store/useAuthStore';
import { logoutAction } from '@/lib/api/auth';

export default function UserDashboardPage() {
  const user = useAuthStore((state) => state.user);
  const router = useRouter();
  const clearUser = useAuthStore((state) => state.clearUser);
  const [hasMounted, setHasMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<
    'bookings' | 'locations' | 'payment' | 'settings'
  >('bookings');
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(
    null
  );

  useEffect(() => {
    setHasMounted(true);
  }, []);


const handleLogout = async () => {
   await logoutAction();
    clearUser();
    router.push('/login');
  }
  const handleReview = (id: string) => {
    setSelectedBookingId(id);
    setIsReviewModalOpen(true);
  };

  const handleSubmitReview = (data: any) => {
    console.log('Review submitted:', data);
    setIsReviewModalOpen(false);
  };

    if (!hasMounted) {
    return (
        <section className="bg-dark-charcoal border-b border-dark-lighter pt-10 pb-8">
             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-grey-medium">
                 Loading...
             </div>
        </section>
    ); 
  }

  return (
    <main className="min-h-screen bg-dark pt-28 pb-12">
      {/* Dashboard Header */}
      <section className="bg-dark-charcoal border-b border-dark-lighter mt-5 pt-10 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center border-2 border-primary">
                <UserIcon className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">
                  Welcome, {user?.first_name} {user?.last_name}
                </h1>
                <p className="text-grey-medium">{user?.registered
                  ?`Member since ${new Date(user.registered).getFullYear()}`
                  : null  
                  }</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button onClick={handleLogout} variant="outline" size="sm">
                <LogOutIcon className="w-4 h-4 mr-2" />
                Log Out
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <nav className="space-y-1">
                {[
                  { id: 'bookings', label: 'My Bookings' },
                  // { id: 'locations', label: 'Saved Locations' },
                  // { id: 'payment', label: 'Payment Methods' },
                  { id: 'settings', label: 'Account Settings' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id as any)}
                    className={`
                      w-full text-left px-4 py-3 rounded-lg transition-colors font-medium
                      ${
                        activeTab === item.id
                          ? 'bg-primary text-black'
                          : 'text-grey-pastel hover:bg-dark-lighter'
                      }
                    `}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'bookings' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-grey-pastel mb-4">
                    Upcoming Bookings
                  </h2>
                  <BookingHistoryCard
                    id="BK-7829"
                    service="Airport Transfer - Luxury Sedan"
                    date="Oct 24, 2023"
                    time="10:00 AM"
                    pickup="123 Main St, Arlington, VA"
                    dropoff="Dulles International Airport (IAD)"
                    price="$125.00"
                    status="upcoming"
                    onViewDetails={() => {}}
                    onModify={() => {}}
                    
                  />

                  <h2 className="text-xl font-bold text-grey-pastel mb-4 mt-8">
                    Past Bookings
                  </h2>
                  <BookingHistoryCard
                    id="BK-6543"
                    service="City Tour - Stretch Limo"
                    date="Sep 15, 2023"
                    time="2:00 PM"
                    pickup="Grand Hyatt, Washington DC"
                    dropoff="Grand Hyatt, Washington DC"
                    price="$450.00"
                    status="completed"
                    onViewDetails={() => {}}
                    onReview={() => handleReview('BK-6543')}
                  />
                  <BookingHistoryCard
                    id="BK-5432"
                    service="Moving Service - 26ft Truck"
                    date="Aug 01, 2023"
                    time="9:00 AM"
                    pickup="Bethesda, MD"
                    dropoff="Silver Spring, MD"
                    price="$380.00"
                    status="cancelled"
                    onViewDetails={() => {}}
                  />
                </div>
              )}

              {activeTab === 'locations' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-grey-pastel">
                      Saved Locations
                    </h2>
                    <Button variant="outline" size="sm">
                      + Add New
                    </Button>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <SavedLocationCard
                      type="home"
                      name="Home"
                      address="123 Main St, Arlington, VA 22202"
                      onEdit={() => {}}
                      onDelete={() => {}}
                    />
                    <SavedLocationCard
                      type="work"
                      name="Office"
                      address="1600 Pennsylvania Ave NW, Washington, DC 20500"
                      onEdit={() => {}}
                      onDelete={() => {}}
                    />
                    <SavedLocationCard
                      type="airport"
                      name="DCA Airport"
                      address="Ronald Reagan Washington National Airport"
                      onEdit={() => {}}
                      onDelete={() => {}}
                    />
                  </div>
                </div>
              )}

              {activeTab === 'payment' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-grey-pastel">
                      Payment Methods
                    </h2>
                    <Button variant="outline" size="sm">
                      + Add New
                    </Button>
                  </div>
                  <div className="space-y-4">
                    <PaymentMethodCard
                      brand="visa"
                      last4="4242"
                      expiry="12/24"
                      isDefault
                      onDelete={() => {}}
                    />
                    <PaymentMethodCard
                      brand="mastercard"
                      last4="8888"
                      expiry="09/25"
                      onDelete={() => {}}
                    />
                  </div>
                </div>
              )}

              {activeTab === 'settings' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-grey-pastel mb-4">
                    Account Settings
                  </h2>
                  <Card padding="lg">
                    <form className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-grey-pastel mb-2">
                            Full Name
                          </label>
                          <input
                            type="text"
                            defaultValue="John Doe"
                            className="w-full px-4 py-3 rounded-lg bg-dark-lighter border border-grey-muted text-grey-pastel"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-grey-pastel mb-2">
                            Email Address
                          </label>
                          <input
                            type="email"
                            defaultValue="john.doe@example.com"
                            className="w-full px-4 py-3 rounded-lg bg-dark-lighter border border-grey-muted text-grey-pastel"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-grey-pastel mb-2">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            defaultValue="(202) 555-0123"
                            className="w-full px-4 py-3 rounded-lg bg-dark-lighter border border-grey-muted text-grey-pastel"
                          />
                        </div>
                      </div>
                      <div className="pt-4 border-t border-dark-lighter">
                        <h3 className="text-lg font-semibold text-grey-pastel mb-4">
                          Change Password
                        </h3>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-grey-pastel mb-2">
                              Current Password
                            </label>
                            <input
                              type="password"
                              placeholder="••••••••"
                              className="w-full px-4 py-3 rounded-lg bg-dark-lighter border border-grey-muted text-grey-pastel"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-grey-pastel mb-2">
                              New Password
                            </label>
                            <input
                              type="password"
                              placeholder="••••••••"
                              className="w-full px-4 py-3 rounded-lg bg-dark-lighter border border-grey-muted text-grey-pastel"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <Button variant="primary">Save Changes</Button>
                      </div>
                    </form>
                  </Card>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        title="Write a Review"
      >
        <ReviewForm
          bookingId={selectedBookingId || ''}
          onSubmit={handleSubmitReview}
          onCancel={() => setIsReviewModalOpen(false)}
        />
      </Modal>
    </main>
  );
}