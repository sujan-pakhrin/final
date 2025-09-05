import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
  const { user, logout } = useContext(AuthContext);
  console.log("User in Home:", user);
  return (
    <div className="flex flex-col justify-center items-center h-screen gap-4">
      <h1>This is home page</h1>
      <div>
        <Link to="/auth/login">
          <button className="bg-blue-500 px-4 py-2 rounded-sm">Login</button>
        </Link>
        <Link to="/auth/register" className="ml-4">
          <button className="bg-blue-500 px-4 py-2 rounded-sm">Register</button>
        </Link>
      </div>
      {user && (
        <div className="p-6 max-w-md mx-auto bg-white shadow-md rounded-md">
          <h2 className="text-2xl font-bold mb-4">Profile</h2>
          <p>
            <strong>Username:</strong> {user.username}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Role:</strong> {user.role}
          </p>
          <button
            onClick={logout}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
