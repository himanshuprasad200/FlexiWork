import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import logo from "../../../images/logo.png";
import { FaPinterest } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="footer"> 
      <div className="containerr">
        <div className="footer-left">
        <div className='footer-logo'>
        <img src={logo} alt="logo" />
        </div>
          <p>Your go-to platform for freelance opportunities.</p>
        </div>
        <div className="footer-right">
          <ul className="footer-links">
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/privacy-policy">Privacy Policy</Link></li>
            <li><Link to="/terms-of-service">Terms of Service</Link></li>
          </ul>
          <div className="social-media">
            <a href="https://in.pinterest.com" target="_blank" rel="noopener noreferrer">
            <FaPinterest size={25} className="social-icon" /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram size={25} className="social-icon" /></a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <FaLinkedin size={25} className="social-icon" /></a>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer">
            <FaXTwitter size={25} className="social-icon" /></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} FLEXIWORK. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
