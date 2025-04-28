// src/components/Payment.jsx
import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm"; // Ensure this file exists

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY); // Load from .env file

const Payment = () => {
    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm />
        </Elements>
    );
};

export default Payment;
