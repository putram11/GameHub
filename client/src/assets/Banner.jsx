// src/assets/Banner.js
import React, { useRef } from 'react';

export const Banner = ({ images }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative mb-8">
      <div className="flex space-x-4 overflow-x-hidden scroll-smooth" ref={scrollRef}>
        {images.map((image, index) => (
          <div key={index} className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 p-2">
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-64 object-cover rounded-lg shadow-md"
            />
          </div>
        ))}
      </div>
      {/* Controls */}
      <button
        className="absolute top-1/2 left-0 transform -translate-y-1/2 z-10 bg-gray-800 text-yellow-400 p-2 rounded-r-lg shadow-lg"
        onClick={() => scroll('left')}
      >
        <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        className="absolute top-1/2 right-0 transform -translate-y-1/2 z-10 bg-gray-800 text-yellow-400 p-2 rounded-l-lg shadow-lg"
        onClick={() => scroll('right')}
      >
        <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};
