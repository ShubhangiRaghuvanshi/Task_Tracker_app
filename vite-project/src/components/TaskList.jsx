import React, { useEffect, useState } from "react";
import TaskCard from "./TaskCard"; // A card to display individual tasks

const TaskList = ({ projectId, onUpdate, onDelete }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const res = await fetch(`http://localhost:4000/api/tasks/${projectId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        setTasks(data.tasks);
      } else {
        alert("Failed to fetch tasks");
      }
    };

    fetchTasks();
  }, [projectId]);

  const handleDelete = async (taskId) => {
    const res = await fetch(`http://localhost:4000/api/tasks/${taskId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const data = await res.json();
    if (res.ok) {
      onDelete(taskId); // Remove the task from the list
    } else {
      alert(data.message || "Failed to delete task");
    }
  };

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-semibold mb-4">Tasks</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.length === 0 ? (
          <p className="text-gray-500">No tasks yet</p>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onUpdate={onUpdate}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TaskList;
