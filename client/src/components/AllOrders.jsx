import React, { useEffect, useState } from "react";
import { Table } from "@mui/material";
import axios from "axios";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [productsData, setProductsData] = useState({});

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Fetch orders
        const orderResponse = await axios.get('http://localhost:2000/api/order/');
        const orders = orderResponse.data.orders;
        // console.log('Fetched Orders:', orders);

        if (!orders || orders.length === 0) {
          console.warn('No orders returned');
          return;
        }

        setOrders(orders);  // Store orders in state

        // Extract unique product IDs from orders
        const uniqueProductIds = [
          ...new Set(orders.flatMap(order => order.products.map(product => product.productId))),
        ];

        console.log('Unique Product IDs:', uniqueProductIds);

        // Fetch product details for each unique product ID
        const productsPromises = uniqueProductIds.map(async (productId) => {
          try {
            console.log(`Fetching Product for ID: ${productId}`);
            const productResponse = await axios.get(`http://localhost:2000/api/product/${productId}`);
            if (productResponse.data.product) {
              const product = productResponse.data.product;
              // console.log(`Fetched Product ${productId}:`, product);
              setProductsData((prevData) => ({
                ...prevData,
                [productId]: product,
              }));
            } else {
              console.warn(`Product with ID ${productId} returned null or undefined`);
            }
          } catch (error) {
            console.error(`Error fetching product ${productId}:`, error.response ? error.response.data : error.message);
          }
        });

        // Wait for all products to be fetched
        await Promise.all(productsPromises);

      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);  // Only runs once after initial render

  return (
    <div className="container">
      <h2 className="text-center my-4">My Orders</h2>
      <Table className="table table-bordered border-black">
        <thead>
          <tr className="table-dark text-center">
            <th>User Name</th>
            <th>Email</th>
            <th>Product Image</th>
            <th>Title</th>
            
            <th>Quantity</th>
            <th>Total Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            orders.map((order) =>
              order.products?.map((product, index) => {
                const productDetails = productsData[product.productId];
                console.log("my debugging ",product)

                return (
                  <tr key={`${order._id}-${index}`} className="text-center">
                    {/* User details */}
                    <td>{order.userId?.name || "Unknown User"}</td>
                    <td>{order.userId?.email || "No email available"}</td>

                    {/* Product details */}
                    <td>
                      <img
                        src={productDetails?.imgSrc || "https://via.placeholder.com/60"}
                        className="img-fluid"
                        style={{ maxWidth: "60px" }}
                        alt="product"
                      />
                    </td>
                    <td>{productDetails?.title || "No title available"}</td>
                    
                    <td>{product.quantity}</td>

                    {/* Order details */}
                    <td>Rs./{order.totalAmount || "0.00"}</td>
                    <td>{order.status || "Unknown Status"}</td>
                  </tr>
                );
              })
            )
          ) : (
            <tr className="text-center">
              <td colSpan="8" className="text-danger fw-bold">
                No Orders Found
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}
