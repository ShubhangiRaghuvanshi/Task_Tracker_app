import React, { useState, useEffect } from "react";
import ProjectForm from "./ProjectForm";
import ProjectCard from "./ProjectCard";

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the projects when the component mounts
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/projects", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Make sure you have a valid token
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch projects");
        }

        const data = await res.json();
        setProjects(data.projects);  // Assuming backend response contains projects in 'projects' array
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Handle new project creation
  const handleCreate = (newProject) => {
    setProjects((prevProjects) => [...prevProjects, newProject]);
  };

  // Handle project deletion
  const handleDelete = (projectId) => {
    setProjects((prevProjects) =>
      prevProjects.filter((project) => project._id !== projectId)
    );
  };

  if (loading) {
    return <p>Loading projects...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="p-4">
      {/* Project Form to create new project */}
      <ProjectForm onCreate={handleCreate} />

      {/* List of Projects */}
      <div className="mt-6">
        {projects.length === 0 ? (
          <p>No projects found. Create a new project!</p>
        ) : (
          projects.map((project) => (
            <ProjectCard
              key={project._id}
              project={project}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ProjectList;
