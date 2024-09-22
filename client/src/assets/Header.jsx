import React from 'react';
import { FaGamepad } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

export default function Header() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();  // Call the logout function from context
    navigate('/');  // Redirect to home page after logout
  };

  return (
    <header className="bg-gray-900 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <FaGamepad size={32} className="text-yellow-500" />
          <h1 className="text-4xl font-bold tracking-wide">GameZone</h1>
        </div>

        {/* Navigation */}
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link to="/" className="text-lg font-semibold hover:text-yellow-400 transition-colors">
                Home
              </Link>
            </li>
            {isAuthenticated ? (
              <>
                <li>
                  <Link to="/home" className="text-lg font-semibold hover:text-yellow-400 transition-colors">
                   UserHome
                </Link>
                </li>
                <li>
                  <Link to="/register" className="text-lg font-semibold hover:text-yellow-400 transition-colors">
                    Register User
                  </Link>
                </li>
                <li>
                  <Link to="/cat" className="text-lg font-semibold hover:text-yellow-400 transition-colors">
                    List Category
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="bg-yellow-500 text-gray-900 px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link to="/login" className="bg-yellow-500 text-gray-900 px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors">
                  Login Now
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
