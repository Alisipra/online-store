import React, { useContext, useEffect, useState } from "react";
import appContext from "../context/AppContext";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { cart, decreaseQty, addToCart, removeProduct, clearCart } = useContext(appContext);
  const [qty, setQty] = useState(0);
  const [price, setPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    let qtyTotal = 0;
    let priceTotal = 0;

    if (cart?.items?.length) {
      cart.items.forEach(item => {
        qtyTotal += item.qty;
        priceTotal += item.price * item.qty; // ✅ Multiply qty * price
      });
    }

    setPrice(priceTotal);
    setQty(qtyTotal);
  }, [cart]);

  return (
    <>
      <div className="text-center fw-bold">
        <button className="btn btn-warning fw-bold m-2 p-2">
          Total Qty: {qty}
        </button>
        <button className="btn btn-info fw-bold m-2 p-2">
          Total Price: Rs.{price.toFixed(2)} {/* ✅ Show price in correct format */}
        </button>
      </div>

      {cart?.items?.length > 0 ? (
        cart.items.map((item) => (
          <div key={item._id} className="container">
            <div className="container shadow-lg mt-3 rounded-3 p-5 m-2 text-center">
              <img
                src={item.imgSrc}
                alt={item.title}
                style={{ width: "200px", height: "200px" }}
                className="p-2 rounded-4"
              />
              <h3>{item.title}</h3>
              <div className="action">
                <h5>Qty: {item.qty}</h5>
                <h6>Price: Rs.{item.price.toFixed(2)}</h6>

                {/* ✅ Fix Quantity Increase */}
                <button 
                  className="btn btn-primary me-2"
                  onClick={() => addToCart(item.productId, item.title, item.price / item.qty, 1, item.imgSrc)}
                >
                  Qty (+)
                </button>

                {/* ✅ Fix Quantity Decrease */}
                <button
                  className="btn btn-warning"
                  onClick={() => decreaseQty(item.productId, 1)}
                >
                  Qty (-)
                </button>

                {/* ✅ Improved Remove Button */}
                <button
                  className="btn btn-danger m-2"
                  onClick={() => {
                    const isConfirmed = window.confirm("Are You Sure You want To remove it?");
                    if (isConfirmed) removeProduct(item.productId);
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <h1 className="text-center fw-bold mt-4">Cart Is Empty...</h1>
      )}

      {/* ✅ Fix Checkout & Clear Cart Buttons */}
      {cart?.items?.length > 0 && (
        <div className="container text-center">
          <button className="btn btn-warning m-2 fw-bold" onClick={() => navigate("/shipping")}>
            Checkout
          </button>
          <button className="btn btn-danger fw-bold" onClick={clearCart}>
            Clear Cart
          </button>
        </div>
      )}
    </>
  );
}
