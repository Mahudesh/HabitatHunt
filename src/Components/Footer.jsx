import React from 'react';
import '../Assets/Footer.css'; // Ensure the path is correct
import { FaFacebook, FaInstagram } from 'react-icons/fa'; // Importing FontAwesome icons
import { MdOutlinePermPhoneMsg } from "react-icons/md";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
    return (
        <div className="footer">
            <div className="footer-content">        
                <div className="contact-info">
                    <MdOutlinePermPhoneMsg className="contact-icon" />
                    <p>Contact Us: 123456789</p>
                </div>
                <p className="copyright-text">@2024 Habitat Hunt Copyrights Reserved</p>
                <div className="social-icons">
                    <FaFacebook className="social-icon" />  
                    <FaInstagram className="social-icon" />
                    <FaXTwitter className="social-icon"/>
                </div>
            </div>
        </div>
    );
}

export default Footer;
