import React, { useContext, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import appContext from "../context/AppContext";
const CheckoutForm = ({ amount, setShowPayment, cart, userId }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
        const {clearCart}=useContext(appContext)
    const {url}=useContext(appContext);
    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null);
        setIsProcessing(true);

        if (!stripe || !elements) {
            setError("Stripe is not initialized.");
            setIsProcessing(false);
            return;
        }

        const cardElement = elements.getElement(CardElement);
        if (!cardElement) {
            setError("Card details not found.");
            setIsProcessing(false);
            return;
        }

        try {
            // 1. Create Payment Intent
            const res = await fetch(`${url}/stripe/create-payment-intent`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount, currency: "usd" }),
            });

            if (!res.ok) throw new Error("Payment initialization failed.");
            
            const { clientSecret } = await res.json();

            if (!clientSecret) throw new Error("Invalid payment credentials.");

            // 2. Confirm Payment
            const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: { card: cardElement },
            });

            if (error) throw new Error(error.message);

            // 3. Create Order in Backend
            const orderData = {
                userId,
                products: cart.map((item) => ({
                    productId: item._id,
                    quantity: item.qty
                })),
                totalAmount: amount / 100,
                status: "Pending"
            };

            await fetch(`${url}/order/createorder`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(orderData),
            });

            alert("Payment Successful!");
            clearCart();
            setShowPayment(false);
        } catch (err) {
            setError(err.message);
        }

        setIsProcessing(false);
    };

    return (
        <>
            <div className={`modal fade ${setShowPayment ? "show d-block" : "d-none"}`} tabIndex="-1">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Enter Payment Details</h5>
                            <button type="button" className="close btn btn-danger" onClick={() => setShowPayment(false)}>
                                &times;
                            </button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit}>
                                <div className="p-3 border rounded">
                                    <CardElement options={{ hidePostalCode: true }} />
                                </div>
                                {error && <p className="text-danger mt-2">{error}</p>}
                                <button type="submit" className="btn btn-success mt-3 w-100" disabled={!stripe || isProcessing}>
                                    {isProcessing ? "Processing..." : `Pay Rs.${(amount / 100).toFixed(2)}`}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`modal-backdrop fade ${setShowPayment ? "show" : "d-none"}`} onClick={() => setShowPayment(false)}></div>
        </>
    );
};

export default CheckoutForm;



