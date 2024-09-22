// src/components/Footer.jsx
import React from 'react';
import { FaTwitter, FaFacebookF, FaInstagram } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white p-6">
      <div className="container mx-auto flex flex-col items-center">
        <p className="text-center mb-4 text-lg font-bold">GameZone</p>
        <p className="text-center mb-4 text-sm">The ultimate gaming experience</p>
        <div className="flex space-x-4 mb-4">
          <a href="#" className="text-blue-400 hover:text-blue-600 transition-colors">
            <FaTwitter size={24} />
          </a>
          <a href="#" className="text-blue-500 hover:text-blue-700 transition-colors">
            <FaFacebookF size={24} />
          </a>
          <a href="#" className="text-pink-500 hover:text-pink-700 transition-colors">
            <FaInstagram size={24} />
          </a>
        </div>
        <p className="text-center text-sm">&copy; 2024 GameZone. All rights reserved.</p>
        <div className="mt-4">
          <p className="text-center text-xs">Designed by PUTRA MAHARDIKA</p>
        </div>
      </div>
    </footer>
  );
}
