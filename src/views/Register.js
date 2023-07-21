import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Register = () => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
    bio: '',
    cover_photo: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('username', formData.username);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('password', formData.password);
    formDataToSend.append('password2', formData.password2);
    formDataToSend.append('bio', formData.bio);
    formDataToSend.append('cover_photo', formData.cover_photo);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/register/', {
        method: 'POST',
        body: formDataToSend,
      });
      const data = await response.json();
      console.log(data);
      history.push('/login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          placeholder="Username"
          value={formData.username}
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
        />
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        <label htmlFor="password2">Confirm Password</label>
        <input
          id="password2"
          type="password"
          placeholder="Confirm Password"
          value={formData.password2}
          onChange={(e) =>
            setFormData({ ...formData, password2: e.target.value })
          }
        />
        <label htmlFor="bio">Bio</label>
        <textarea
          id="bio"
          placeholder="Bio"
          value={formData.bio}
          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
        />
        <label htmlFor="cover_photo">Photo</label>
        <input
          id="cover_photo"
          type="file"
          accept="image/*"
          onChange={(e) =>
            setFormData({ ...formData, cover_photo: e.target.files[0] })
          }
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
