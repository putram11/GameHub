// src/layouts/RootLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../assets/Header.jsx';
import Footer from '../assets/Footer.jsx';

export default function RootLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
