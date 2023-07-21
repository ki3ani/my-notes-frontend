import { useContext, useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import NoteForm from "../components/NoteForm";
import useAxios from "../utils/useAxios";
import { API_ENDPOINT } from '../utils/config';

const GetNotes = () => {
  const { authTokens } = useContext(AuthContext);
  const history = useHistory();
  const [notes, setNotes] = useState([]);
  const [showNoteForm, setShowNoteForm] = useState(false);
  const axios = useAxios();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/notes");
        setNotes(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (authTokens) {
      fetchData();
    }
  }, [authTokens]);

  const handleNoteClick = (noteId) => {
    history.push(`/notes/${noteId}`);
  };

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center my-8">
        <button
          onClick={() => setShowNoteForm(true)}
          className="bg-blue-500 text-white font-medium py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
        >
          Create Note
        </button>
      </div>
      {showNoteForm && <NoteForm setNotes={setNotes} />}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {notes.map((note) => (
          <div
            key={note.id}
            className="border border-gray-400 rounded-lg overflow-hidden shadow-md cursor-pointer"
          >
            <div onClick={() => handleNoteClick(note.id)}>
            {note.cover_image ? (
             <img
                src={`${API_ENDPOINT}/${note.cover_image}`}
                alt=""
                className="w-full h-48 object-cover"
                onLoad={() => console.log(`Loaded image for note ${note.id}`)}
                onError={() => console.log(`Failed to load image for note ${note.id}`)}
                
                />
              ) : (
              <div className="w-full h-48 bg-gray-200"></div>
                  )}
              <div className="px-4 py-2">
                <h2 className="text-lg font-medium text-gray-900">
                  {note.title}
                </h2>
                <p className="mt-2 text-gray-600 line-clamp-3">{note.body}</p>
              </div>
            </div>
          </div>
        ))}
        {notes.length === 0 && (
          <div className="text-center col-span-3">
            <p className="text-gray-600">No notes found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GetNotes;
