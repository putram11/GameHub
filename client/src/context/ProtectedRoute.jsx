import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const token = localStorage.getItem('token'); // Check if the token exists in localStorage

  // If token is not present, user is not authenticated
  if (!token) {
    return <Navigate to="/login" />;
  }

  // If token exists, render the child routes
  return <Outlet />;
};

export default ProtectedRoute;