/* eslint-disable @typescript-eslint/no-explicit-any */
// components/UserForm.tsx
import React, { useState } from "react";

type UserFormProps = {
  onSubmit: (formData: {
    username: string;
    email: string;
    password: string;
  }) => void;
};

const UserForm: React.FC<UserFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
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
      setFormData({ username: "", email: "", password: "" }); // Clear the form
    } catch (error: any) {
      setFormError(error.message || "Failed to add user.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-4 p-4 bg-gray-100 shadow-md rounded text-gray-700"
    >
      <h3 className="text-black text-lg font-bold mb-2">Add New User</h3>
      {formError && <p className="text-red-500 text-sm mb-2">{formError}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleFormChange}
          placeholder="Username"
          className="p-2 border rounded"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleFormChange}
          placeholder="Email"
          className="p-2 border rounded"
          required
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleFormChange}
          placeholder="Password"
          className="p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add User
        </button>
      </div>
    </form>
  );
};

export default UserForm;
