import React from "react";
import { Link } from "react-router-dom";

function HomeNonAuth() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-200">
      <h1 className="text-4xl font-bold mb-8">Welcome to My App</h1>
      <p className="text-lg mb-4">
        This is a simple app for taking notes. You can create, edit, and delete
        notes to help you stay organized.
      </p>
      <p className="text-lg mb-4">
        To get started, please log in or create an account.
      </p>
      <div className="flex">
        <Link
          to="/login"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
        >
          Log In
        </Link>
        <Link
          to="/register"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Create an Account
        </Link>
      </div>
    </div>
  );
}

export default HomeNonAuth;
