import React from "react";
import "./JobCard.css";

function JobCard(props) {
  const { name, description, handleDragStart } = props;
  return (
    <div className="job-card" draggable onDragStart={handleDragStart}>
      <span className="job-card-name">{name}</span>
      <span className="job-card-description">{description}</span>
    </div>
  );
}

export default JobCard;
