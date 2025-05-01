import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import ProjectForm from "../components/ProjectForm";
import ProjectCard from "../components/ProjectCard";
import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate(); // Initialize navigate for redirection
  const [projects, setProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [selectedProjectName, setSelectedProjectName] = useState("");
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); // Redirect to login if no token is found
    } else {
      fetchProjects(token);
    }
  }, [navigate]);

  const fetchProjects = async (token) => {
    try {
      const res = await fetch("http://localhost:4000/api/projects", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();

      if (res.ok) {
        setProjects(data.projects || []);
      } else {
        throw new Error(data.message || "Failed to fetch projects");
      }
    } catch (err) {
      console.error("Failed to fetch projects", err);
      if (err.message.includes("token")) {
        localStorage.removeItem("token"); // Remove invalid token
        navigate("/login"); // Redirect to login page if token is invalid
      }
    }
  };

  const fetchTasks = async (projectId, projectName, token) => {
    try {
      const res = await fetch(`http://localhost:4000/api/tasks/${projectId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();

      if (res.ok) {
        setTasks(data.tasks);
        setSelectedProjectName(projectName);
        setSelectedTask(null);
      } else {
        setTasks([]);
      }
    } catch (err) {
      console.error("Failed to fetch tasks", err);
      if (err.message.includes("token")) {
        localStorage.removeItem("token"); // Remove invalid token
        navigate("/login"); // Redirect to login page if token is invalid
      }
    }
  };

  const handleProjectClick = (projectId, projectName) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); // Redirect to login if no token is found
    } else {
      setSelectedProjectId(projectId);
      fetchTasks(projectId, projectName, token);
    }
  };

  const handleCreateTask = (newTask) => {
    setTasks((prev) => [...prev, newTask]);
  };

  const handleUpdateTask = (updatedTask) => {
    setTasks((prev) =>
      prev.map((t) => (t._id === updatedTask._id ? updatedTask : t))
    );
    setSelectedTask(null);
  };

  const handleEditTask = (task) => {
    setSelectedTask(task);
  };

  const handleDeleteTask = async (taskId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); // Redirect to login if no token is found
    } else {
      try {
        const res = await fetch(`http://localhost:4000/api/tasks/${taskId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
        } else {
          alert("Failed to delete task");
        }
      } catch (err) {
        console.error("Error deleting task:", err);
        if (err.message.includes("token")) {
          localStorage.removeItem("token"); // Remove invalid token
          navigate("/login"); // Redirect to login page if token is invalid
        }
      }
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <h1 className="text-4xl font-bold text-center mb-8">Your Projects</h1>

        {/* Project Form */}
        <div className="mb-8">
          <ProjectForm onCreate={() => fetchProjects(localStorage.getItem("token"))} />
        </div>

        {/* Project List */}
        <div className="project-list">
          {projects.map((project) => (
            <div
              key={project._id}
              onClick={() => handleProjectClick(project._id, project.title)}
              className="project-card"
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>

        {/* Display Tasks When a Project is Selected */}
        {selectedProjectId && (
          <>
            <h2 className="text-3xl font-semibold text-gray-700 mb-4">
              Tasks for {selectedProjectName || "the selected project"}
            </h2>

            {/* Task Form */}
            <div className="mb-8">
              <TaskForm
                projectId={selectedProjectId}
                task={selectedTask}
                onCreate={handleCreateTask}
                onUpdate={handleUpdateTask}
              />
            </div>

            {/* Task List */}
            <div className="task-list">
              {tasks.length > 0 ? (
                tasks.map((task) => (
                  <div key={task._id} className="task-card">
                    <TaskCard
                      task={task}
                      onDelete={handleDeleteTask}
                      onUpdate={handleEditTask}
                    />
                  </div>
                ))
              ) : (
                <p className="col-span-full text-center text-gray-500">
                  No tasks found for this project.
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
