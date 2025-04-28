import React, { useContext, useState } from 'react'
import appContext from '../../context/AppContext';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
  const [formData, setFormData] = useState({name:"",email:"",password:""});
  const {register}=useContext(appContext);
  const navigate=useNavigate();
  const onChangeHandler = (e) => {
    const { name, value } = e.target; // Correctly destructure from e.target
    setFormData({ ...formData, [name]: value });
  };
  const{name,email,password}=formData;
  const handleFormSubmit=async(e)=>{

    e.preventDefault();
    const result=await register(name,email,password);
    if(result.message==="Signup Successfully..."){
     navigate("/user/login")   
    }
    }
  
  return (
    <>
    <div className="container shadow-lg mt-4 p-4 w-50 rounded-3">
      <h1 className='text-center fw-bold'>Sign Up</h1>
    <form onSubmit={handleFormSubmit}>
    <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
    <input type="text" name='name' value={formData.name} onChange={onChangeHandler} className="form-control" id="exampleInputEmail144" aria-describedby="emailHelp"/>
    
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" name='email' value={formData.email} onChange={onChangeHandler} className="form-control" id="exampleInputEmai4l1" aria-describedby="emailHelp"/>
    
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" name='password' value={formData.password} onChange={onChangeHandler} className="form-control" id="exampleInputPassword134"/>
  </div>
  
  <button type="submit" className="btn btn-danger m-2">Register</button>
  <Link to={"/user/login"} className="btn btn-outline-warning text-black">Login</Link>
</form>
    </div>
    
    </>
  )
}
