import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { Outlet } from 'react-router-dom';
import SidebarContent from "./SidebarContent"
const AdminLayout = () => {
  return (
    <div className="d-flex flex-column flex-md-row vh-100">
      {/* Sidebar always visible on desktop */}
      <div className="d-none d-md-block bg-dark text-white p-3" style={{ width: "250px" }}>
        <SidebarContent />
      </div>

      {/* Offcanvas sidebar for mobile (already in Sidebar.jsx) */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-grow-1 d-flex flex-column bg-light">
        <Header />
        <main className="p-3 flex-grow-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
