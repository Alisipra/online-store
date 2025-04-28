import React, { useEffect, useState, useContext } from "react";

import axios from "axios";
import { Bounce, toast } from "react-toastify";
import ProductForm from "./ProductForm";
import appContext from "../../../context/AppContext";

const Products = () => {
  const { token, url } = useContext(appContext);
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editProduct, setEditProduct] = useState(null); // For editing

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${url}/product/all`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      setProducts(res.data.product);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const deleteProduct = async (productId) => {
    try {
      const res = await axios.delete(`${url}/product/${productId}`, {
        headers: {
          "Content-Type": "application/json",
          Auth: token,
        },
        withCredentials: true,
      });

      toast.success(res.data.message || "Product deleted!", {
        position: "top-right",
        autoClose: 1500,
        theme: "dark",
        transition: Bounce,
      });

      fetchProducts(); // Refresh list
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed!", {
        position: "top-right",
        autoClose: 1500,
        theme: "dark",
        transition: Bounce,
      });
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleEdit = (product) => {
    setEditProduct(product);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditProduct(null);
    fetchProducts();
  };
  const handleFormSubmit = async (data) => {
    try {
      if (editProduct) {
        // Update existing product
        const res = await axios.put(`${url}/product/${editProduct._id}`, data, {
          headers: {
            "Content-Type": "application/json",
            Auth: token,
          },
          withCredentials: true,
        });
        toast.success(res.data.message || "Product updated!", {
          position: "top-right",
          autoClose: 1500,
          theme: "dark",
          transition: Bounce,
        });
      } else {
        // Add new product
        const res = await axios.post(`${url}/product/add`, data, {
          headers: {
            "Content-Type": "application/json",
            Auth: token,
          },
          withCredentials: true,
        });
        toast.success(res.data.message || "Product added!", {
          position: "top-right",
          autoClose: 1500,
          theme: "dark",
          transition: Bounce,
        });
      }
      handleFormClose();
    } catch (error) {
      toast.error(error.response?.data?.message || "Operation failed!", {
        position: "top-right",
        autoClose: 1500,
        theme: "dark",
        transition: Bounce,
      });
    }
  };
  

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>All Products</h3>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? "Close Form" : "Add Product"}
        </button>
      </div>

      {showForm && (
        <ProductForm
        show={showForm}
          onClose={handleFormClose}
          existingProduct={editProduct}
          onSubmit={handleFormSubmit}
        />
      )}

      <div className="table-responsive mt-3">
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Price</th>
              <th>Category</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((p, index) => (
              <tr key={p._id}>
                <td>{index + 1}</td>
                <td>{p.title}</td>
                <td>{p.price}/Rs</td>
                <td>{p.category || "N/A"}</td>
                <td>
                  <img src={p.imgSrc} alt="product" width={60} height={60} />
                </td>
                <td>
                  <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(p)}>
                    Edit
                  </button>
                  <button className="btn btn-sm btn-danger" onClick={() => deleteProduct(p._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center text-muted">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    
  );
};

export default Products;
