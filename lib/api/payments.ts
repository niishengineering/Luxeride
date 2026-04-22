
"use server"

import { cookies } from "next/headers";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

async function getAuthHeaders() {
  const cookieStore = await cookies();
  const token = cookieStore.get('session_token')?.value;
  return {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,
  };
}

export async function createPaymentIntent(trip_id: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/payments/create-intent`, {
      method: "POST",
      headers: await getAuthHeaders(),
      body: JSON.stringify({ trip_id }),
    });

    const data = await res.json();
    if (!res.ok) {
      return { status: "fail", message: data.message || "Failed to create payment intent" };
    }

    return { status: "success", client_secret: data.client_secret };
  } catch (error) {
    return { status: "fail", message: "Network error occurred while creating payment intent" };
  }
}

export async function verifyPayment(payment_intent_id: string, trip_id: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/payments/verify`, {
      method: "POST",
      headers: await getAuthHeaders(),
      body: JSON.stringify({ payment_intent_id, trip_id }),
    });

    const data = await res.json();
    if (!res.ok || data.status !== "success") {
      return { status: "fail", message: data.message || "Payment verification failed" };
    }

    return { status: "success" };
  } catch (error) {
    return { status: "fail", message: "Network error occurred during payment verification" };
  }
}

export async function confirmTrip(trip_id: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/payments/confirm-trip`, {
      method: "POST",
      headers: await getAuthHeaders(),
      body: JSON.stringify({ trip_id }),
    });

    const data = await res.json();
    if (!res.ok || data.status !== "success") {
      return { status: "fail", message: data.message || "Failed to confirm trip" };
    }

    return { status: "success" };
  } catch (error) {
    return { status: "fail", message: "Failed to confirm trip" };
  }
}
