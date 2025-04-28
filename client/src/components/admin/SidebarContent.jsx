import React from "react";
import { Link } from "react-router-dom";

const SidebarContent = () => {
  return (
    <ul className="nav flex-column">
      <li className="nav-item">
        <Link to="/admin/dashboard" className="nav-link text-white">Dashboard</Link>
      </li>
      <li className="nav-item">
        <Link to="/admin/products" className="nav-link text-white">Products</Link>
      </li>
      <li className="nav-item">
        <Link to="/admin/orders" className="nav-link text-white">Orders</Link>
      </li>
      <li className="nav-item">
        <Link to="/admin/users" className="nav-link text-white">Users</Link>
      </li>
      <li className="nav-item">
        <Link to="/admin/settings" className="nav-link text-white">Settings</Link>
      </li>
    </ul>
  );
};

export default SidebarContent;
