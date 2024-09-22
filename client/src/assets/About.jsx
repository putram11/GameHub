// src/components/About.js
import React from 'react';

export const About = () => {
  // Placeholder image URL for the banner
  const bannerImageUrl = 'https://wallpapercat.com/w/full/2/b/6/1152309-1920x1080-desktop-1080p-esports-wallpaper.jpg';

  return (
    <div className="bg-gray-900 bg-opacity-80 rounded-lg shadow-lg p-6 mb-8">
      <div className="relative w-full h-64 mb-8">
        <img 
          src={bannerImageUrl} 
          alt="About Us Banner" 
          className="w-full h-full object-cover rounded-lg" 
        />
      </div>
      <h2 className="text-3xl font-bold text-yellow-400 mb-4">About Us</h2>
      <p className="text-gray-300 mb-4">
        Welcome to our website! We are dedicated to bringing you the latest news and articles on a variety of topics. Our team of experienced writers and editors work tirelessly to provide you with well-researched and engaging content.
      </p>
      <p className="text-gray-300 mb-4">
        Our mission is to inform, inspire, and entertain our readers. Whether you're looking for the latest in technology, health tips, lifestyle advice, or in-depth features on current events, we have something for everyone.
      </p>
      <p className="text-gray-300 mb-4">
        We believe in the power of knowledge and the importance of staying informed. That's why we cover a wide range of topics and ensure that our articles are accurate, reliable, and up-to-date.
      </p>
      <p className="text-gray-300 mb-4">
        Thank you for visiting our website. We hope you enjoy reading our articles as much as we enjoy writing them. If you have any questions, feedback, or suggestions, please don't hesitate to contact us.
      </p>
      <p className="text-gray-300">
        Stay connected with us through our social media channels and subscribe to our newsletter to stay updated on the latest content. We look forward to serving you with quality articles and insights.
      </p>
    </div>
  );
};
