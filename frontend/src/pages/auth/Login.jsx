import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login submitted:", formData);
    // 👉 Replace with your API call
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md w-full mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-bold mb-4 text-center">Login</h2>

      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="shadow-sm border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-2">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          className="shadow-sm border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <button
        type="submit"
        className="w-full mb-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-medium transition-colors"
      >
        Login
      </button>
      <div className="flex justify-between">
        <span>New at this website?</span>
        <Link to={'/auth/register'}>Signup</Link>
      </div>
    </form>
  );
};

export default Login;
