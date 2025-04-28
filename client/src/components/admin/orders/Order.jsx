import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Bounce, toast } from "react-toastify";
import appContext from "../../../context/AppContext";

const Orders = () => {
  const { token, url } = useContext(appContext);
  const [orders, setOrders] = useState([]);
  const [showProductsModal, setShowProductsModal] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${url}/order/`, {
        headers: {
          "Content-Type": "application/json",
          Auth: token,
        },
        withCredentials: true,
      });
      setOrders(res.data.orders); // Assuming you receive orders from the backend
    } catch (error) {
      toast.error("Error fetching orders.", {
        position: "top-right",
        autoClose: 1500,
        theme: "dark",
        transition: Bounce,
      });
    }
  };
  // Update order status
  const updateStatus = async (orderId, newStatus) => {
    try {
      const res = await axios.put(`${url}/order/status/${orderId}`, { status: newStatus });
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
      alert("Order status updated successfully!");
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Error updating status!");
    }
  };
  useEffect(() => {
    fetchOrders();
  }, []);

  const handleViewProducts = (order) => {
    setCurrentOrder(order);
    setShowProductsModal(true);
  };

  const handleCloseModal = () => {
    setShowProductsModal(false);
    setCurrentOrder(null);
  };

  return (
    <div className="container py-4">
      <h3>All Orders</h3>

      <div className="table-responsive mt-3">
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>Order ID</th>
              <th>User</th>
              <th>Email</th>
              <th>Total Amount</th>
              <th>Status</th>
              <th>Order Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order) => (
              <tr key={order._id}>
                <td>{order.shortOrderId}</td>

                <td>{order.userId?.name || "N/A"}</td>
                <td>{order.userId?.email || "N/A"}</td> {/* Assuming userId has name */}
                <td>${order.totalAmount}</td>
                <td>{order.status}</td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td>
                <select
                  value={order.status}
                  onChange={(e) => updateStatus(order._id, e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center text-muted">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal to display products */}
      {showProductsModal && currentOrder && (
        <div className="modal d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Order Products</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseModal}
                ></button>
              </div>
              <div className="modal-body">
                <h6>Products:</h6>
                <ul>
                  {currentOrder.products?.map((product, index) => (
                    <li key={index}>
                      <strong>{product.title}</strong> - ${product.price} x{" "}
                      {product.quantity}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCloseModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
