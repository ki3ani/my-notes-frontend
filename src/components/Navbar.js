import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import logo from "../assets/images.png";

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);
  
  return (
    <nav className="flex justify-between items-center py-4">
      <div className="flex items-center">
        <img src={logo} alt="Logo" className="h-8 mr-4" />
        <Link to="/" className="text-lg font-semibold">
          Notes App
        </Link>
      </div>
      {user && (
        <div className="flex items-center">
          <Link to="/profile" className="mr-4">
            Profile
          </Link>
          <Link to="/notes" className="mr-4">
            Notes
          </Link>
          <button
            onClick={logoutUser}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
