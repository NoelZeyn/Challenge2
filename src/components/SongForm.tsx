/* eslint-disable @typescript-eslint/no-explicit-any */
// components/SongForm.tsx
import React, { useState } from "react";

type SongFormProps = {
  onSubmit: (formData: {
    title: string;
    artist: string;
    album: string;
    genre: string;
    url: string;
    url_yt: string;
  }) => void;
};

const SongForm: React.FC<SongFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    title: "",
    artist: "",
    album: "",
    genre: "",
    url: "",
    url_yt: "",
  });
  const [formError, setFormError] = useState("");

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    try {
      onSubmit(formData);
      setFormData({
        title: "",
        artist: "",
        album: "",
        genre: "",
        url: "",
        url_yt: "",
      }); // Clear the form
    } catch (error: any) {
      setFormError(error.message || "Failed to add song.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-4 p-4 bg-gray-100 shadow-md rounded text-gray-700 "
    >
      <h3 className="text-black text-lg font-bold mb-2">Add New User</h3>
      {formError && <p className="text-red-500 text-sm mb-2">{formError}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-7 gap-4">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleFormChange}
          placeholder="Title"
          className="p-2 border rounded"
          required
        />
        <input
          type="text"
          name="artist"
          value={formData.artist}
          onChange={handleFormChange}
          placeholder="Artists"
          className="p-2 border rounded"
          required
        />
        <input
          type="text"
          name="album"
          value={formData.album}
          onChange={handleFormChange}
          placeholder="Album"
          className="p-2 border rounded"
          required
        />
        <input
          type="text"
          name="genre"
          value={formData.genre}
          onChange={handleFormChange}
          placeholder="Genre"
          className="p-2 border rounded"
          required
        />
        <input
          type="text"
          name="url"
          value={formData.url}
          onChange={handleFormChange}
          placeholder="Link Music Folder"
          className="p-2 border rounded"
          required
        />
        <input
          type="text"
          name="url_yt"
          value={formData.url_yt}
          onChange={handleFormChange}
          placeholder="Link Youtube"
          className="p-2 border rounded"
          required
        />
        
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add Song
        </button>
      </div>
    </form>
  );
};

export default SongForm;
