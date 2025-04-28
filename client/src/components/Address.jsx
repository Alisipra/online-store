import React, { useContext, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import appContext from '../context/AppContext';

export default function ShippingAddress() {
  const [formData, setFormData] = useState({
    fullname: "",
    address: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    phone: ""
  });
  
  const { addAddress,userAddress } = useContext(appContext);
  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const result = await addAddress(formData);
    if (result.message === "Address Added Successfully...") {
      navigate("/checkout"); // Redirect to checkout page after adding address
    }
  };

  return (
    <div className="container shadow-lg mt-4 p-4 w-50 rounded-3">
      <h1 className='text-center fw-bold'>Shipping Address</h1>
      <form onSubmit={handleFormSubmit}>
        {Object.keys(formData).map((field, index) => (
          <div className="mb-3" key={index}>
            <label htmlFor={field} className="form-label">
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <input
              type={field === "phone" || field === "pincode" ? "number" : "text"}
              name={field}
              value={formData[field]}
              onChange={onChangeHandler}
              className="form-control"
              id={field}
              required
            />
          </div>
        ))}

        <button type="submit" className="btn btn-success m-2">Save Address</button>
        {userAddress &&(
          <button className="btn btn-warning m-2" onClick={()=>navigate("/checkout")}>Use Old Address</button>

        )}
      </form>
    </div>
  );
}
