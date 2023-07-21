import React, { useState, useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import moment from "moment";
import NoteForm from "../components/NoteForm";
import useAxios from "../utils/useAxios";
import AuthContext from "../context/AuthContext";
import { API_ENDPOINT } from '../utils/config';


function NoteDetail() {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const [editing, setEditing] = useState(false);
  const { authTokens } = useContext(AuthContext);
  const axiosInstance = useAxios(authTokens);
  const history = useHistory();

  useEffect(() => {
    if (authTokens) {
      axiosInstance.get(`http://localhost:8000/api/notes/${id}/`).then((response) => {
        setNote(response.data);
      }).catch((error) => {
        console.error(error);
      });
    }
  }, [authTokens, id]);

  const handleUpdate = async (formData) => {
    try {
      const response = await axiosInstance.patch(
        `http://localhost:8000/api/notes/${id}/`,
        formData
      );
      setNote(response.data);
      setEditing(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`http://localhost:8000/api/notes/${id}/delete`);
      history.push("/notes");
    } catch (error) {
      console.error(error);
    }
  };

  if (!authTokens) {
    return <div>Loading...</div>;
  }

  if (!note) {
    return <div>Loading...</div>;
  }

  if (editing) {
    return <NoteForm note={note} handleSubmit={handleUpdate} />;
  }

  return (
    <div className="max-w-lg mx-auto my-8">
      <img
        className="h-64 w-full object-cover mb-4"
        src={`${API_ENDPOINT}/${note.cover_image}`}
        alt={note.title}
      />
      <h1 className="text-2xl font-bold text-gray-800 mb-4">{note.title}</h1>
      <p className="text-gray-600 text-base mb-4">{note.body}</p>
      <p className="text-gray-500 text-sm">
        Last updated: {moment(note.updated).format("MMMM Do YYYY, h:mm:ss a")}
      </p>
      <div className="flex justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
          onClick={() => setEditing(true)}
        >
          Edit Note
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
          onClick={handleDelete}
        >
          Delete Note
        </button>
      </div>
    </div>
  );
}

export default NoteDetail;
