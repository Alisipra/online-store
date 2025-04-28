import React from "react";

const Header = () => {
  return (
    <header className="d-flex justify-content-between align-items-center bg-white shadow p-3">
      {/* Hamburger button for sidebar */}
      <button
        className="btn btn-outline-dark d-md-none"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#adminSidebar"
        aria-controls="adminSidebar"
      >
        <i className="bi bi-list"></i> {/* Bootstrap Icon */}
      </button>

      <h5 className="mb-0">Admin Panel</h5>

      {/* Right-side content (optional) */}
      <div>
        <span>Welcome Admin</span>
      </div>
    </header>
  );
};

export default Header;
