import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import useAxios from "../utils/useAxios";
import AuthContext from "../context/AuthContext";

const UpdateProfilePage = () => {
  const { authTokens } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [coverPhoto, setCoverPhoto] = useState(null);
  const axiosInstance = useAxios();
  const history = useHistory();

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();

    // Check each field and add it to the formData if it has been updated
    if (username !== "") {
      formData.append("username", username);
    }

    if (email !== "") {
      formData.append("email", email);
    }

    if (bio !== "") {
      formData.append("bio", bio);
    }

    if (coverPhoto !== null) {
      formData.append("cover_photo", coverPhoto);
    }

    axiosInstance
      .patch("/profile/update/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        console.log("Profile updated successfully");
        history.push("/profile");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <h1>Update Profile Page</h1>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="bio">Bio:</label>
          <textarea
            id="bio"
            value={bio}
            onChange={(event) => setBio(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="coverPhoto">Cover photo:</label>
          <input
            type="file"
            id="coverPhoto"
            accept="image/*"
            onChange={(event) => setCoverPhoto(event.target.files[0])}
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default UpdateProfilePage;
