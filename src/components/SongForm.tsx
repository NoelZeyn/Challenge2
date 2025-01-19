/* eslint-disable @typescript-eslint/no-explicit-any */
// components/SongForm.tsx
'use client';

import React, { useState, useRef } from "react";
import type { PutBlobResult } from "@vercel/blob";

type SongFormProps = {
  onSubmit: (formData: {
    title: string;
    artist: string;
    album: string;
    genre: string;
    url: string;
    url_yt: string;
    audioUrl?: string;
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
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [blob, setBlob] = useState<PutBlobResult | null>(null);
  const [formError, setFormError] = useState("");

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    let audioUrl = "";

    if (inputFileRef.current?.files) {
      const file = inputFileRef.current.files[0];

      try {
        const response = await fetch(`/api/upload?filename=${file.name}`, {
          method: 'POST',
          body: file,
        });
        

        if (!response.ok) {
          throw new Error("Failed to upload audio file.");
        }

        const newBlob = (await response.json()) as PutBlobResult;
        audioUrl = newBlob.url;
        setBlob(newBlob);
      } catch (error: any) {
        setFormError(error.message || "Failed to upload audio file.");
        return;
      }
    }

    try {
      onSubmit({ ...formData, audioUrl });
      setFormData({
        title: "",
        artist: "",
        album: "",
        genre: "",
        url: "",
        url_yt: "",
      });
      setBlob(null);
    } catch (error: any) {
      setFormError(error.message || "Failed to add song.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-4 p-4 bg-gray-100 shadow-md rounded text-gray-700"
    >
      <h3 className="text-black text-lg font-bold mb-2">Add New Song</h3>
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
          placeholder="Artist"
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
          placeholder="Link YouTube"
          className="p-2 border rounded"
          required
        />
        <input
          name="file"
          ref={inputFileRef}
          type="file"
          accept="audio/*"
          className="p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add Song
        </button>
      </div>
      {blob && (
        <div className="mt-4">
          <p>Uploaded audio URL: <a href={blob.url} className="text-blue-500" target="_blank" rel="noopener noreferrer">{blob.url}</a></p>
        </div>
      )}
    </form>
  );
};

export default SongForm;