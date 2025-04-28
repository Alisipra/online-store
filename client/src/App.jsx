import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ShowProducts from "./components/products/ShowProducts";
import ProductDetails from "./components/products/ProductDetails";
import Navbar from "./components/Navbar";
import SearchProduct from "./components/products/SearchProduct";
import Register from "./components/user/Register";
import Login from "./components/user/Login";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Profile from "./components/user/Profile";
import Cart from "./components/Cart";
import Address from "./components/Address";
import Checkout from "./components/Checkout";
import Payment from "./components/Payment";
import AllOrders from "./components/AllOrders";
// import ProductList from "./components/admin/ProductList";
import AddProduct from "./components/admin/AddProduct";
import EditProduct from "./components/admin/EditProduct";
import UserList from "./components/admin/UserList";
// import OrderList from "./components/admin/OrderList";
import AdminLogin from "./components/admin/AdminLogin";
import AdminLayout from "./components/admin/AdminLayout";
import Settings from "./components/admin/Settings";
import Products from "./components/admin/products/Product";
import Orders from "./components/admin/orders/Order";
import AdminProtectedRoute from "./components/admin/AdminProtectedRoute";

import Dashboard from "./components/admin/Dashboard";

const App = () => {
  return (
    <>
      <Payment />
      <Router>
        <Navbar />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<ShowProducts />} />
          <Route path="/product/search/:term" element={<SearchProduct />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/user/login" element={<Login />} />
          <Route path="/user/signup" element={<Register />} />
          <Route path="/user/profile" element={<Profile />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/shipping" element={<Address />} />
          <Route path="/allorders" element={<AllOrders />} />
          <Route path="/checkout" element={<Checkout />} />

          {/* admin area for routing */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route
              path="/admin/dashboard"
              element={
                
                 <AdminProtectedRoute>
                   <Dashboard />
                 </AdminProtectedRoute>
                
              }
            />

            
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/products" element={
               <AdminProtectedRoute>
                <Products />
               </AdminProtectedRoute>
              
              } />
            <Route path="/admin/products/add" element={
              
              <AdminProtectedRoute>
                <AddProduct />
              </AdminProtectedRoute>
              } />
            <Route path="/admin/products/edit/:id" element={
              
              <AdminProtectedRoute>
                <EditProduct />
              </AdminProtectedRoute>
              } />
            <Route path="/admin/users" element={
              <AdminProtectedRoute>
                <UserList />
              </AdminProtectedRoute>
              } />
            <Route path="/admin/orders" element={
              
              <AdminProtectedRoute>
                <Orders />
              </AdminProtectedRoute>
              } />
            <Route path="/admin/settings" element={
              <AdminProtectedRoute>
                <Settings />
              </AdminProtectedRoute>
              
              } />
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
