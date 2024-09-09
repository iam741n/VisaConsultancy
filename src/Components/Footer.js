import React from 'react';
import '../Footer.css'; // For custom styles
import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-logo">
          <img src="/j1.png" alt="Jay Visa Logo" className="footer-logo-img" />
        </div>
        <div className="footer-text">
          <h3 className="footer-title">JAY VISA</h3>
          
        </div>
        <div className="footer-icons">
          <a href="https://www.facebook.com/jayvisaofficial?mibextid=ZbWKwL" target="_blank" rel="noopener noreferrer" className="social-icon">
            <FaFacebook />
          </a>
          <a href="https://www.instagram.com/jayvisaofficial?igsh=MXR2Y2YwYjA3ZzNzcQ%3D%3D" target="_blank" rel="noopener noreferrer" className="social-icon">
            <FaInstagram />
          </a>
          <a href="https://api.whatsapp.com/send?phone=923213040505" target="_blank" rel="noopener noreferrer" className="social-icon">
            <FaWhatsapp />
          </a>
        </div>
      </div>
      <div className="footer-description">
        <p>
          With years of experience and a commitment to excellence, Jay Visa has established itself as a beacon of reliability and trustworthiness in the visa services industry.
        </p>
      </div>
      <div className="footer-bottom">
        <h5>© 2024 JAY VISA | Designed & Developed by <a href="https://www.linkedin.com/in/iam741n/" target="_blank" rel="noopener noreferrer">Zain Ul Abdeen</a> Crafted with care and creativity | All rights reserved</h5>
      </div>
    </footer>
  );
};

export default Footer;
