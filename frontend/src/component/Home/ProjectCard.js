import React from "react";
import { Rating } from "@material-ui/lab"; 
import { Link } from "react-router-dom";
import "./ProjectCard.css"

const ProjectCard = ({ project }) => {
 
  const options = {   
    value: project.ratings,
    readOnly: true,
    precision: 0.5
  };
  return (
    <Link className="projectCard" to={`/project/${project._id}`}>
      <img src={project.images[0].url} alt={project.name} />
      <div className="headings">
        <h4>{project.name}</h4>
        <h5>Category: {project.category}</h5>
      </div>
      <p>{project.title}</p>
      <div className="projectCardSpan">
        <Rating {...options} />{" "}
        <span> ({project.numOfReviews} Reviews) </span>
      </div>
      <span className="money-span">From {`₹${project.price}`}</span>
    </Link>
  );
};

export default ProjectCard;
