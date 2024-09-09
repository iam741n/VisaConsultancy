import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Login.css';
import Footer from './Footer'; // Import the Footer component
import backgroundImage from '../assets/login.jpg';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); // useNavigate instead of useHistory

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://apivisa-d8dmara5gufchfht.eastus-01.azurewebsites.net/api/User/Login?Email=${encodeURIComponent(email)}&Password=${encodeURIComponent(password)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log('API response:', response);

      if (!response.ok) {
        const errorData = await response.json();
        alert('Login failed: ' + errorData.message);
        return;
      }

      const data = await response.json();
      console.log('API Response Data:', data); // Log the entire API response

      // Check the role from the API response
      if (data.role === 'Admin' || data.role === 'admin') {
        console.log("Welcome Admin:", data.firstName, data.lastName);
        navigate('/AdminHome', { state: { userData: data } }); // Replace with your Admin dashboard route
      } else if (data.role === 'Employee' || data.role === 'employee') {
        console.log("Welcome Employee:", data.firstName, data.lastName);
        navigate('/EmpolyeeHome', { state: { userData: data } }); // Replace with your Employee dashboard route
       
      } else {
        alert('Login failed: Unexpected user role');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <div style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div className="login-container d-flex justify-content-center align-items-center">
        <div className="login-box-container">
          <div className="login-form-container col-md-6 p-4 bg-light border rounded">
            <div className="login-form">
              <h1 className="mb-4 text-center">Jay Visa</h1>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="email">Your Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Your Password</label>
                  <div className="input-group">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className="form-control"
                      id="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <div className="input-group-append">
                      <span className="input-group-text" onClick={togglePasswordVisibility}>
                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                      </span>
                    </div>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary w-100">Log in</button>
              </form>

              <p className="mt-3 text-center">
                Don't have an account yet? <a href="/Signup">Sign up</a>
              </p>
            </div>
          </div>
          <div className="login-image-container col-md-6 d-none d-md-flex align-items-center justify-content-center">
            <div className="text-center">
              <h2>Welcome Back!</h2>
              <p>Unlock exclusive visa opportunities with us.
              Enter your details and become a part of us.</p>
              <h5>New User?</h5>
              <a href="/Signup" className="btn btn-outline-light">Sign Up</a>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Login;
