import React, { useContext, useEffect, useState } from "react";
import appContext from "../context/AppContext";

export default function TableProduct({ cart }) {
  const [qty, setQty] = useState(0);
  const [price, setPrice] = useState(0);
  const { decreaseQty, addToCart, removeProduct } = useContext(appContext);

  useEffect(() => {
    let totalQty = 0;
    let totalPrice = 0;

    if (Array.isArray(cart)) {
      cart.forEach((item) => {
        totalQty += item.qty || 0;
        totalPrice += (item.price || 0) * (item.qty || 1);
      });
    }

    setQty(totalQty);
    setPrice(totalPrice);
  }, [cart]);

  return (
    <div className="container">
      <div className="table-responsive">
        <table className="table table-bordered border-black">
          <thead>
            <tr className="table-dark text-center">
              <th>Product Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Qty++</th>
              <th>Qty--</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(cart) && cart.length > 0 ? (
              cart.map((item) => (
                <tr key={item.productId} className="text-center">
                  <td>
                    <img
                      src={item.imgSrc}
                      alt={item.title}
                      className="img-fluid"
                      style={{ maxWidth: "60px", height: "auto" }}
                    />
                  </td>
                  <td>{item.title}</td>
                  <td>{item.price}-/Rs</td>
                  <td>{item.qty}</td>
                  <td>
                    <button
                      className="btn btn-primary w-100"
                      onClick={() =>
                        addToCart(
                          item.productId,
                          item.title,
                          item.price / (item.qty || 1),
                          1,
                          item.imgSrc
                        )
                      }
                    >
                      <i className="fa-solid fa-plus"></i>
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-secondary w-100"
                      onClick={() => decreaseQty(item.productId, 1)}
                    >
                      <i className="fa-solid fa-minus"></i>
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger w-100"
                      onClick={() => {
                        if (window.confirm("Are You Sure You want To remove it?")) {
                          removeProduct(item.productId);
                        }
                      }}
                    >
                      <i className="fa-solid fa-xmark"></i>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="text-center">
                <td colSpan="7" className="text-danger fw-bold">
                  No items in the cart
                </td>
              </tr>
            )}
            <tr className="text-center table-light">
              <td colSpan="2">
                <button className="btn btn-primary fw-bold w-100">Total</button>
              </td>
              <td>
                <button className="btn btn-secondary fw-bold w-100">{price}-/Rs</button>
              </td>
              <td>
                <button className="btn btn-info fw-bold w-100">{qty}</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
