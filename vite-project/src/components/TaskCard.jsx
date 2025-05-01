import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa"; // For edit and delete icons
import './taskCard.css';

const TaskCard = ({ task, onUpdate, onDelete }) => {
  console.log("TaskCard component rendered with task:", task);
  const handleDelete = () => {
    onDelete(task._id); 
  };

  // Function to format the date in a readable way
  const formatDate = (date) => {
    if (!date) return '';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h3 className="text-xl font-semibold">{task.title}</h3>
      <p className="mt-2 text-gray-600">{task.description}</p>
      <p className="mt-2 text-sm text-gray-500">Status: {task.status}</p>
      
      {/* Displaying creation date */}
      <p className="mt-2 text-sm text-gray-500">
        Created on: {formatDate(task.createdAt)}
      </p>

      {/* Displaying completion date if task is completed */}
      {task.completedAt && (
        <p className="mt-2 text-sm text-gray-500">
          Completed on: {formatDate(task.completedAt)}
        </p>
      )}

      <div className="mt-4 flex justify-end space-x-4">
        <button
          onClick={() => onUpdate(task)} // Pass task to be updated
          className="text-blue-500"
        >
          <FaEdit />
        </button>
        <button
          onClick={handleDelete} // Trigger task deletion
          className="text-red-500"
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
