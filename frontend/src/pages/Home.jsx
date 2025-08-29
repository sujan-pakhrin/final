import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
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
    </div>
  );
};

export default Home;
