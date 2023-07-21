import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { useContext } from 'react';
import useAxios from '../utils/useAxios';
import FileValidation from '../utils/FileValidation';
import { API_ENDPOINT } from '../utils/config';

function NoteForm({ setNotes = () => {} }) {
  const navigate = useHistory();
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [coverImage, setCoverImage] = useState(null);
  const [body, setBody] = useState('');
  const [message, setMessage] = useState('');
  const { authTokens } = useContext(AuthContext);
  const axios = useAxios();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/notes/${id}/`, {
          headers: {
            Authorization: `Bearer ${authTokens}`,
          },
        });
        setTitle(res.data.title);
        setBody(res.data.body);
      } catch (error) {
        console.error(error);
        navigate('/notes');
      }
    };

    if (authTokens && id) {
      fetchData();
    }
  }, [authTokens, id, axios, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    // Validate file
    FileValidation(e.target.cover_image.files, setMessage, e);

    if (message) {
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('body', body);
    if (coverImage) {
      formData.append('cover_image', coverImage);
    }
    try {
      let response;
      if (id) {
        response = await axios.patch(
          `${API_ENDPOINT}/api/notes/${id}/update/`,
          formData
        );
        setNotes((prevNotes) =>
          prevNotes.map((note) =>
            note.id === response.data.id ? response.data : note
          )
        );
        alert('Note updated successfully!');
        navigate.push(`/notes/${response.data.id}`);
      } else {
        response = await axios.post(
          `${API_ENDPOINT}/api/notes/create/`,
          formData
        );
        setNotes((prevNotes) => [response.data, ...prevNotes]);
        alert('Note created successfully!');
        navigate.push(`/notes`);
      }
      setTitle('');
      setBody('');
      setCoverImage(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFileChange = (e) => {
    setCoverImage(e.target.files[0]);
    FileValidation(e.target.files, setMessage, e);
  };

  return (
    <div className="container mx-auto px-4">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="border border-gray-400 rounded w-full px-3 py-2 mt-1 text-gray-900"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="cover_image" className="block font-medium text-gray-700">
            Cover Image
          </label>
          <input
            type="file"
            name="cover_image"
            id="cover_image"
            onChange={handleFileChange}
            className="border border-gray-400 rounded w-full px-3 py-2 mt-1 text-gray-900"
          />
          {message && <p className="text-red-500 mt-1">{message}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="body" className="block font-medium text-gray-700">
            Body
          </label>
          <textarea
            name="body"
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
            rows="5"
            className="border border-gray-400 rounded w-full px-3 py-2 mt-1 text-gray-900"
          ></textarea>
        </div>
        <div className="mb-4">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            {id ? 'Update Note' : 'Create Note'}
          </button>
        </div>
      </form>
    </div>
  );

}

export default NoteForm;

