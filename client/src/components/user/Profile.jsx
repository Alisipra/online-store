import React, { useContext, useEffect, useState } from "react";
import appContext from "../../context/AppContext";
import axios from "axios";

export default function Profile() {
  const { user } = useContext(appContext);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const fetchOrders = async () => {
      if (!user?._id) return; // Ensure user is logged in

      try {
        const response = await axios.get(
          `http://localhost:2000/api/order/${user._id}`
        );
        console.log("Order history:", response.data);

        setOrders([...response.data]); // Try spreading response data
      } catch (error) {
        console.error(
          "Error fetching orders:",
          error.response?.data?.message || error.message
        );
      }
    };
    fetchOrders();
  }, [user]);
  useEffect(() => {
    console.log("Updated orders state:", orders);
  }, [orders]);

  return (
    <>
      <div className="container mt-4">
        <div className="card shadow-lg p-4">
          <div className="d-flex align-items-center flex-column text-center justify-content-center">
            <img
              src={
                user?.profilePic ||
                "https://cdn.pixabay.com/photo/2014/03/25/16/54/user-297566_640.png"
              }
              alt="Profile"
              className="rounded-circle me-3"
              width="100"
              height="100"
            />
            <div>
              <h4>{user?.name}</h4>
              <p className="text-muted">{user?.email}</p>
            </div>
          </div>

          <hr />

          <h5 className="mb-3">Order History</h5>
          <ul className="list-group">
            {orders.length > 0 ? (
              orders.map((order) => (
                <li key={order._id} className="list-group-item p-3">
                  <h4 className="mb-2 text-center">Order ID: {order._id}</h4>
                  <p className="text-lg-center"> 
                    <strong>Status:</strong>{" "}
                    <span className="text-primary">{order.status}</span>
                  </p>
                  <p className="text-lg-center">
                    <strong>Total Amount:</strong>{" "}
                    <span className="text-success">Rs/{order.totalAmount}</span>
                  </p>

                  {/* <h5 className="mt-3 text-lg-center fw-bold fs-1">Products:</h5>
                  <ul className="list-group list-group-flush text-lg-center">
                    {order.products.length > 0 ? (
                      order.products.map((productItem) =>
                        productItem.productId ? ( // ✅ Ensure product exists
                          <li
                            key={productItem.productId._id}
                            className="list-group-item text-lg-center d-flex justify-content-between align-items-center"
                          >
                            <div className="text-center fs-3 w-100">
                              <div>
                                <img src={productItem.productId.imgSrc} style={{width:"150px",height:"100px"}} alt="" />
                              </div>
                              <strong>
                                {productItem.productId.title ||
                                  "Unnamed Product"}
                              </strong>{" "}
                              <br />
                              <span className="text-muted">
                                Price: ${productItem.productId.price}
                              </span>{" "}
                              <br />
                              <span>Quantity: {productItem.quantity}</span>
                            </div>
                          </li>
                        ) : (
                          <li
                            key={productItem._id}
                            className="list-group-item text-danger"
                          >
                            Product details not available
                          </li>
                        )
                      )
                    ) : (
                      <li className="list-group-item text-muted">
                        No products found
                      </li>
                    )}
                  </ul> */}
                </li>
              ))
            ) : (
              <li className="list-group-item text-muted text-center">
                No orders found
              </li>
            )}
          </ul>

      
        </div>
      </div>
    </>
  );
}
