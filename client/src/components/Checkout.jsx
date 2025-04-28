import React, { useContext, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import appContext from "../context/AppContext";
import TableProduct from "./TableProduct";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51R5Uh7041daFrk2zZ2BSPFoQlRHmTE3CgZdzNfq3KdXCfFSzgfmqyQ4Ck9n4FrPehPV0KoQ41TcLMoDGSQHn6Hll006ikJ2QtZ"
);

export default function Checkout() {
  const { cart, userAddress,user } = useContext(appContext);
  const [showPayment, setShowPayment] = useState(false);

  // Ensure cart.items is an array
  const items = Array.isArray(cart?.items) ? cart.items : [];

  // Calculate total price
  const totalAmount =
    items.reduce((acc, item) => acc + item.price * item.qty, 0) * 100; // Convert to cents

  return (
    <>
      <div className="text-center fw-bold my-4">
        <h1>Order Summary</h1>
      </div>

      <div className="container shadow-lg p-3">
        <div className="table-responsive">
          <table className="table table-bordered border-primary">
            <thead>
              <tr className="text-center">
                <th scope="col" className="bg-dark text-light">
                  Product Details
                </th>
                <th scope="col" className="bg-dark text-light">
                  Shipping Details
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2">
                  <TableProduct cart={items} />
                </td>
                <td className="p-3">
                  {userAddress ? (
                    <div className="card bg-light p-3">
                      <div className="card-body">
                        <h5 className="card-title fw-bold">Shipping Address</h5>
                        <ul className="list-unstyled">
                          <li>
                            <strong>Name:</strong> {userAddress.fullname}
                          </li>
                          <li>
                            <strong>Address:</strong> {userAddress.address}
                          </li>
                          <li>
                            <strong>City:</strong> {userAddress.city}
                          </li>
                          <li>
                            <strong>State:</strong> {userAddress.state}
                          </li>
                          <li>
                            <strong>Country:</strong> {userAddress.country}
                          </li>
                          <li>
                            <strong>Pincode:</strong> {userAddress.pincode}
                          </li>
                          <li>
                            <strong>Phone:</strong> {userAddress.phone}
                          </li>
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <p className="text-danger fw-bold">
                      No addresses available
                    </p>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="text-center">
          {/* Show Payment Modal when clicked */}
          <button
            className="btn btn-warning my-3 fw-bold px-4 py-2"
            onClick={() => setShowPayment(true)}
          >
            Pay Now
          </button>

          {/* Show Payment Modal if showPayment is true */}
          {showPayment && (
            <Elements stripe={stripePromise}>
              <CheckoutForm
                amount={totalAmount}
                setShowPayment={setShowPayment}
                cart={items}
                userId={user._id}
              />
            </Elements>
          )}
        </div>
      </div>
    </>
  );
}
