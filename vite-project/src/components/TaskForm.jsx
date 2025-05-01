import React, { useState, useEffect } from "react";

const TaskForm = ({ projectId, task, onCreate, onUpdate }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Not Started");

  // If task is passed, set initial values for update
  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setStatus(task.status);
    }
  }, [task]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !status) {
      alert("Please fill in all fields");
      return;
    }

    const newTask = { title, description, status, projectId };

    let res;
    if (task) {
      // Update task
      res = await fetch(`http://localhost:4000/api/tasks/${task._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(newTask),
      });
      const data = await res.json();
      if (res.ok) {
        onUpdate(data.task);
      } else {
        alert(data.message || "Failed to update task");
      }
    } else {
      // Create task
      res = await fetch("http://localhost:4000/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(newTask),
      });
      const data = await res.json();
      if (res.ok) {
        onCreate(data.task); // Add to the list
        setTitle("");
        setDescription("");
        setStatus("Not Started");
      } else {
        alert(data.message || "Failed to create task");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-lg font-medium">
          Task Title
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
      <div>
        <label htmlFor="description" className="block text-lg font-medium">
          Task Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="mt-2 p-2 border rounded w-full"
        />
      </div>
      <div>
        <label htmlFor="status" className="block text-lg font-medium">
          Status
        </label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
          className="mt-2 p-2 border rounded w-full"
        >
          <option value="Not Started">Not Started</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {task ? "Update Task" : "Create Task"}
      </button>
    </form>
  );
};

export default TaskForm;
