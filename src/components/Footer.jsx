import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-gray-200 text-gray-800 py-8 mt-12">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row justify-between items-center">
          
          {/* Company Info */}
          <div className="text-center lg:text-left mb-6 lg:mb-0">
            <h3 className="text-2xl font-semibold text-secondary">GenTECH</h3>
            <p className="mt-2 text-sm leading-relaxed">
              Leading the way in technology solutions, GenTECH is committed to innovation and customer satisfaction.
            </p>
          </div>

          {/* Social Media Icons */}
          <div className="flex space-x-4 mt-6 lg:mt-0">
            <a href="https://facebook.com" className="text-gray-800 hover:text-primary transition">
              <FaFacebook size={24} />
            </a>
            <a href="https://twitter.com" className="text-gray-800 hover:text-primary transition">
              <FaTwitter size={24} />
            </a>
            <a href="https://instagram.com" className="text-gray-800 hover:text-primary transition">
              <FaInstagram size={24} />
            </a>
            <a href="https://linkedin.com" className="text-gray-800 hover:text-primary transition">
              <FaLinkedin size={24} />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center mt-6 text-sm border-t border-gray-300 pt-4">
          <p>© {new Date().getFullYear()} GenTECH. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;