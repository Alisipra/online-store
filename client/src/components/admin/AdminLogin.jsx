// src/pages/AdminLogin.jsx
import { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import appContext from '../../context/AppContext';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const { setIsAdminAuthenticated,url } = useContext(appContext);
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${url}/admin/login`, {
        email,
        password,
      });

      localStorage.setItem('admintoken', res.data.token);
      setIsAdminAuthenticated(true);
      alert('Login successful');
      navigate('/admin/dashboard'); // or wherever your admin panel is
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
    <div className="card p-4 shadow-lg" style={{ maxWidth: '400px', width: '100%' }}>
      <h2 className="text-center mb-4">Admin Login</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Admin Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-danger">
            Login
          </button>
        </div>
      </form>
    </div>
  </div>
  
  );
};

export default AdminLogin;
