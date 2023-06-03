"use client";

import { useState } from "react";

export default function Dashboard() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [picture, setPicture] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAgeChange = (e) => {
    setAge(e.target.value);
  };

  const handlePictureChange = (e) => {
    setPicture(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform the submission logic here
    // You can use the state values (name, age, picture) to send the data to your backend or perform any other actions
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-md mx-auto bg-white shadow-md rounded-md p-6">
        <h2 className="text-xl font-semibold mb-4">Dashboard</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="text-gray-700 font-medium">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={name}
              onChange={handleNameChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="age" className="text-gray-700 font-medium">
              Age
            </label>
            <input
              type="text"
              id="age"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={age}
              onChange={handleAgeChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="picture" className="text-gray-700 font-medium">
              Picture
            </label>
            <input
              type="file"
              id="picture"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              onChange={handlePictureChange}
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600">
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
