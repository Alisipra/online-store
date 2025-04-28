import React from "react";
import SidebarContent from "./SidebarContent";

const Sidebar = () => {
  return (
    <div
      className="offcanvas offcanvas-start bg-dark text-white"
      tabIndex="-1"
      id="adminSidebar"
      aria-labelledby="adminSidebarLabel"
    >
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="adminSidebarLabel">Admin Panel</h5>
        <button
          type="button"
          className="btn-close text-reset bg-white"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div className="offcanvas-body p-0">
        <SidebarContent />
      </div>
    </div>
  );
};

export default Sidebar;
