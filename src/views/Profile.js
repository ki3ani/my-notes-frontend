import { useState, useEffect } from "react";
import useAxios from "../utils/useAxios";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { API_ENDPOINT } from "../utils/config";

const ProfilePage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [cover_photo, setCoverPhoto] = useState("");
  const { authTokens } = useContext(AuthContext);
  const axiosInstance = useAxios();
  const history = useHistory();

  useEffect(() => {
    axiosInstance
      .get("/profile/")
      .then((response) => {
        setUsername(response.data.username);
        setEmail(response.data.email);
        setBio(response.data.bio);
        setCoverPhoto(response.data.cover_photo);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [axiosInstance]);

  const handleEditClick = () => {
    history.push("/update");
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Profile Page</h1>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleEditClick}
      >
        Edit Profile
      </button>
      <div className="mt-8">
        <img
          className="w-full h-64 object-cover rounded-lg shadow-md mb-4"
          src={`${API_ENDPOINT}/${cover_photo}`}
          alt=""
        />
        <div className="flex flex-col">
          <p className="font-bold text-lg text-gray-800 mb-2">
            {username}
          </p>
          <p className="text-gray-600 mb-2">{email}</p>
          <p className="text-gray-700 mb-4">{bio}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
