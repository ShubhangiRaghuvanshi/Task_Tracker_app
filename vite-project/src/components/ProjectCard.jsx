import React from "react";
import './ProjectCard.css'; // Import your custom CSS file for styling

const ProjectCard = ({ project }) => {
  const { title, description } = project;

  return (
    <div className="project-card">
      <h2 className="project-card__title">{title}</h2>
      <p className="project-card__description">{description}</p>
      <button className="project-card__cta">Learn More</button>
    </div>
  );
};

export default ProjectCard;
