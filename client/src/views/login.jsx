import { useState } from "react";
import { localRequest } from "../utils/axios";
import { useNavigate } from "react-router-dom";
import { FaGamepad } from 'react-icons/fa';


export default function LoginPage() {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleChangeInput = (event) => {
    const key = event.target.name;
    const value = event.target.value;

    setUserData({
      ...userData,
      [key]: value,
    });
  };

  const navigate = useNavigate();
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const { email, password } = userData;

    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    try {
      let { data } = await localRequest({
        url: "/user/login",
        method: "POST",
        data: { email, password },
      });
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("id", data.id);
      
      navigate("/home");
    } catch (error) {
      console.error(error);
      alert("Login failed. Please check your credentials and try again.");
    }
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-800 via-blue-800 to-indigo-800">
      <div className="w-full max-w-md p-8 bg-gray-900 bg-opacity-80 rounded-lg shadow-lg border border-gray-700">
        <div className="flex items-center justify-center mb-6">
          <FaGamepad size={48} className="text-yellow-400" />
        </div>
        <h3 className="text-3xl font-bold text-center text-yellow-400 mb-6">Login to GameZone</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-gray-300 text-sm font-semibold mb-2">
              Email address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full p-3 border border-gray-600 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Enter your email"
              value={userData.email}
              onChange={handleChangeInput}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-300 text-sm font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full p-3 border border-gray-600 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Enter your password"
              value={userData.password}
              onChange={handleChangeInput}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-yellow-500 text-gray-900 py-3 rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
