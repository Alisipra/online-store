import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import appContext from "../context/AppContext";

export default function Navbar() {
  const [searchProduct, setSearchProduct] = useState("");
  const { logout, product, setFilterData, isAuthenticated, cart } =
    useContext(appContext);
  const location = useLocation();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/product/search/${searchProduct}`);
  };

  const logoutFunction = () => {
    logout();
    navigate("/");
  };

  const filterByCategory = (cat) => {
    setFilterData(product?.filter((data) => data.category.toLowerCase() === cat.toLowerCase()));
  };

  const filterByPrice = (price) => {
    setFilterData(product?.filter((data) => data.price >= price));
  };

  // Hide navbar on admin pages
  if (location.pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
        <div className="container-fluid p-3">
          <Link className="navbar-brand fw-bold" to="/">
            🛒 E-Commerce
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarContent"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse justify-content-between" id="navbarContent">
            {/* Search Bar */}
            <form onSubmit={handleSubmit} className="w-50">
              <div className="input-group mx-auto my-2 my-lg-0" style={{ maxWidth: "360px" }}>
                <span className="input-group-text border-0">
                  <i className="fa-solid fa-magnifying-glass"></i>
                </span>
                <input
                  type="text"
                  className="form-control rounded-end-2 p-2"
                  placeholder="Search products..."
                  value={searchProduct}
                  onChange={(e) => setSearchProduct(e.target.value)}
                />
              </div>
            </form>

            {/* Right Section */}
            <div className="d-flex flex-wrap gap-2 align-items-center mt-2 mt-lg-0">
              {isAuthenticated ? (
                <>
                  <Link to="/allorders" className="btn btn-outline-info">
                    📦 Orders
                  </Link>
                  <Link to="/cart" className="btn btn-outline-primary position-relative">
                    🛒 Cart
                    {cart?.items?.length > 0 && (
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {cart.items.length}
                      </span>
                    )}
                  </Link>
                  <Link to="/user/profile" className="btn btn-outline-success">
                    👤 Profile
                  </Link>
                  <button onClick={logoutFunction} className="btn btn-outline-danger">
                     Logout
                  </button>
                </>
              ) : (
                <>
                  {/* Customer Dropdown */}
                  <div className="dropdown">
                    <button
                      className="btn btn-warning dropdown-toggle"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                       Customer
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        <Link className="dropdown-item" to="/user/login">
                          Login
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/user/signup">
                          Register
                        </Link>
                      </li>
                    </ul>
                  </div>

                  {/* Admin Login */}
                  <Link to="/admin/login" className="btn btn-outline-light">
                     Admin
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Filter Bar - Only on Home Page */}
      {location.pathname === "/" && (
        <div className="container-fluid bg-black text-white py-2">
          <div className="d-flex flex-wrap justify-content-around">
            <span className="filter-item" onClick={() => setFilterData(product)}>All Products</span>
            <span className="filter-item" onClick={() => filterByCategory("Mobiles")}>Mobiles</span>
            <span className="filter-item" onClick={() => filterByCategory("Laptops")}>Laptops</span>
            <span className="filter-item" onClick={() => filterByCategory("Cameras")}>Cameras</span>
            <span className="filter-item" onClick={() => filterByCategory("HeadPhones")}>HeadPhones</span>
            <span className="filter-item" onClick={() => filterByCategory("MobileCover")}>Mobile Covers</span>
            <span className="filter-item" onClick={() => filterByPrice(29999)}>29999+</span>
            <span className="filter-item" onClick={() => filterByPrice(49999)}>49999+</span>
            <span className="filter-item" onClick={() => filterByPrice(89999)}>89999+</span>
            <span className="filter-item" onClick={() => filterByPrice(109999)}>109999+</span>
          </div>
        </div>
      )}

      <style>{`
        .filter-item {
          margin: 5px;
          padding: 6px 12px;
          cursor: pointer;
          border-radius: 5px;
        }
        .filter-item:hover {
          background-color: #0d6efd;
          color: white;
        }
      `}</style>
    </>
  );
}
