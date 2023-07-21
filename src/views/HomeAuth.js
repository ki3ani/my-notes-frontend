import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

function HomeAuth() {
  const { user } = useContext(AuthContext);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-200">
      <h1 className="text-4xl font-bold mb-8">Welcome to My App</h1>
      <p className="text-lg mb-4">
        This is a simple app for taking notes. You can create, edit, and delete
        notes to help you stay organized.
      </p>
      {user ? (
        <p className="text-lg mb-4">Welcome back, {user.username}!</p>
      ) : null}
      <div className="flex">
        <Link
          to="/notes"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Go to Notes
        </Link>
      </div>
    </div>
  );
}

export default HomeAuth;
