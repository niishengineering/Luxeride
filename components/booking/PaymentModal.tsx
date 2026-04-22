"use client";

import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { Modal } from '@/components/shared/Modal';
import { Button } from '@/components/shared/Button';
import { Shield, Loader2, CreditCard, Lock } from 'lucide-react';
import { createPaymentIntent, verifyPayment, confirmTrip } from '@/lib/api/payments';
import { toast } from 'sonner';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface CheckoutFormProps {
  tripId: string;
  amount: number;
  onSuccess: () => void;
  onCancel: () => void;
}

function CheckoutForm({ tripId, amount, onSuccess, onCancel }: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessing(true);
    setError(null);

    try {
      // 1. Create Payment Intent
      const intentRes = await createPaymentIntent(tripId.toString());
      console.log("[Payment] Intent created:", intentRes);
      if (intentRes.status !== 'success') {
        throw new Error(intentRes.message);
      }

      // 2. Confirm Payment with Stripe
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) throw new Error("Card element not found");

      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
        intentRes.client_secret,
        {
          payment_method: {
            card: cardElement,
          },
        }
      );

      console.log("[Payment] Stripe result status:", paymentIntent?.status);
      console.log("[Payment] Full Stripe result:", { stripeError, paymentIntent });

      if (stripeError) {
        throw new Error(stripeError.message);
      }

      if (paymentIntent && (paymentIntent.status === 'succeeded' || paymentIntent.status === 'requires_capture')) {
        console.log("[Payment] Stripe confirmation successful:", paymentIntent.id);
        
        // 3. Verify on Backend
        console.log("[Payment] Initiating verification with backend...", { paymentIntentId: paymentIntent.id, tripId: tripId.toString() });
        const verifyRes = await verifyPayment(paymentIntent.id, tripId.toString());
        console.log("[Payment] Verification response from backend:", verifyRes);
        
        if (verifyRes.status === 'success') {
          // 4. Final Trip Confirmation
          const confirmRes = await confirmTrip(tripId.toString());
          console.log("[Payment] Trip confirmation:", confirmRes);
          
          if (confirmRes.status === 'success') {
            toast.success("Payment successful & Trip confirmed!");
            onSuccess();
          } else {
            throw new Error(confirmRes.message);
          }
        } else {
          throw new Error(verifyRes.message);
        }
      }
    } catch (err: any) {
      setError(err.message);
      toast.error(err.message || "Payment failed");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white/5 p-4 rounded-xl border border-white/10">
        <label className="text-xs font-bold text-grey-dark uppercase tracking-widest mb-3 block">
          Card Details
        </label>
        <div className="p-4 bg-dark-lighter rounded-lg border border-white/5">
          <CardElement 
            options={{
              hidePostalCode: true, // Resolves the "postal code incomplete" error
              style: {
                base: {
                  fontSize: '16px',
                  color: '#F5F5F5',
                  fontFamily: 'Geist, sans-serif',
                  '::placeholder': {
                    color: '#666666',
                  },
                },
                invalid: {
                  color: '#ef4444',
                },
              },
            }}
          />
        </div>
        <p className="text-[10px] text-grey-dark mt-3 italic">
          * Securely encrypted via Stripe SSL. Your card data never touches our servers.
        </p>
      </div>

      {error && (
        <p className="text-red-500 text-xs font-medium bg-red-500/10 p-3 rounded-lg border border-red-500/20">
          {error}
        </p>
      )}

      <div className="flex items-center justify-between p-4 bg-primary/5 rounded-xl border border-primary/10">
        <div>
          <p className="text-[10px] uppercase font-bold text-grey-dark">Total Amount</p>
          <p className="text-xl font-bold text-primary">${amount}</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] uppercase font-bold text-grey-dark flex items-center justify-end">
            <Lock className="w-3 h-3 mr-1" /> SSL Secure
          </p>
          <p className="text-[10px] text-grey-medium">Powered by Stripe</p>
        </div>
      </div>

      <div className="flex gap-3">
        <Button 
          type="button" 
          variant="ghost" 
          className="flex-1" 
          onClick={onCancel}
          disabled={isProcessing}
        >
          Cancel
        </Button>
        <Button 
          type="submit" 
          className="flex-1 bg-primary text-black hover:bg-primary/90" 
          disabled={!stripe || isProcessing}
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Shield className="w-4 h-4 mr-2" />
              Pay Now
            </>
          )}
        </Button>
      </div>
    </form>
  );
}

export function PaymentModal({ 
  isOpen, 
  onClose, 
  tripId, 
  amount, 
  onSuccess 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  tripId: string; 
  amount: number;
  onSuccess: () => void;
}) {
  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="Secure Checkout"
    >
      <div className="p-1">
        <div className="flex items-center space-x-3 mb-6 p-4 bg-white/5 rounded-2xl border border-white/10">
          <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
            <CreditCard className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="font-bold text-grey-pastel">Complete your Payment</h3>
            <p className="text-xs text-grey-medium">Safe & encrypted transaction</p>
          </div>
        </div>

        <Elements stripe={stripePromise}>
          <CheckoutForm 
            tripId={tripId} 
            amount={amount} 
            onSuccess={onSuccess} 
            onCancel={onClose}
          />
        </Elements>
      </div>
    </Modal>
  );
}
