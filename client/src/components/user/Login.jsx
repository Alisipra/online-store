import React, { useContext, useState } from 'react'
import appContext from '../../context/AppContext';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const [formData, setFormData] = useState({email:"",password:""});
  const {login}=useContext(appContext);
  const navigate=useNavigate();
  const onChangeHandler = (e) => {
    const { name, value } = e.target; // Correctly destructure from e.target
    setFormData({ ...formData, [name]: value });
  };
  const{email,password}=formData;
  const handleFormSubmit=async(e)=>{

    e.preventDefault();
    const result=await login(email,password);
    if(result.message==="Login successfully..."){
     navigate("/")   
    }
    }
  
  return (
    <>
    <div className="container shadow-lg mt-4 p-4 w-50 rounded-3">
      <h1 className='text-center fw-bold'>Sign In</h1>
    <form onSubmit={handleFormSubmit}>
  
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" name='email' value={formData.email} onChange={onChangeHandler} className="form-control" id="exampleInputEmai4l1" aria-describedby="emailHelp"/>
    
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" name='password' value={formData.password} onChange={onChangeHandler} className="form-control" id="exampleInputPassword134"/>
  </div>
  
  <button type="submit" className="btn btn-danger m-2">Login</button>
  <Link to={"/user/signup"} className="btn btn-outline-warning text-black">New User?</Link>
</form>
    </div>
    
    </>
  )
}
