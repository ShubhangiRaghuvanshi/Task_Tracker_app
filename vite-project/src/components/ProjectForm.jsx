import React, { useState } from "react";
import './ProjectForm.css'; // Import your custom CSS file for styling  

const ProjectForm = ({ onCreate }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title) {
      alert("Please fill in the title");
      return;
    }

    const newProject = { title };

    const res = await fetch("http://localhost:4000/api/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(newProject),
    });

    const data = await res.json();

    if (res.ok) {
      onCreate(data.project); // Pass the new project to the Dashboard to update the state
      setTitle(""); // Clear the form
    } else {
      alert(data.message || "Failed to create project");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-lg font-medium">
          Project Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="mt-2 p-2 border rounded w-full"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Create Project
      </button>
    </form>
  );
};

export default ProjectForm;
