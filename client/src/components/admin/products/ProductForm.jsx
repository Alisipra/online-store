import React, { useState, useEffect } from "react";

const ProductForm = ({ show, onClose, existingProduct, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    qty: "",
    price: "",
    imgSrc: "",
  });

  useEffect(() => {
    if (existingProduct) {
      setFormData(existingProduct);
    } else {
      setFormData({
        title: "",
        description: "",
        category: "",
        qty: "",
        price: "",
        imgSrc: "",
      });
    }
  }, [existingProduct]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!show) return null;

  return (
    <>
      <div
        className="modal fade show d-block"
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      >
        <div className="modal-dialog">
          <form onSubmit={handleSubmit} className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                {existingProduct ? "Edit" : "Add"} Product
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
              ></button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                name="title"
                placeholder="Product Title"
                className="form-control mb-2"
                value={formData.title}
                onChange={handleChange}
                required
              />
               <input
                type="text"
                name="description"
                placeholder="Product Description"
                className="form-control mb-2"
                value={formData.description}
                onChange={handleChange}
                required
              />
               <input
                type="text"
                name="category"
                placeholder="Product Category"
                className="form-control mb-2"
                value={formData.category}
                onChange={handleChange}
                required
              />
               <input
                type="text"
                name="qty"
                placeholder="Product qty"
                className="form-control mb-2"
                value={formData.qty}
                onChange={handleChange}
                required
              />
              <input
                type="number"
                name="price"
                placeholder="Price"
                className="form-control mb-2"
                value={formData.price}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="imgSrc"
                placeholder="Image URL"
                className="form-control"
                value={formData.imgSrc}
                onChange={handleChange}
                required
              />
            </div>
            <div className="modal-footer">
              <button type="submit" className="btn btn-success">
                {existingProduct ? "Update" : "Add"} Product
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ProductForm;
