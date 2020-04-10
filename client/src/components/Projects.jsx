import React, { useState, useEffect } from "react";
import AddProjectForm from "../components/AddProjectForm";
import axios from "axios";
import { Link } from "react-router-dom";

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/projects")
      .then((res) => {
        console.log(res);
        setProjects(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      {projects.map((project) => (
        <Link to={`/details/${project.id}`}>
          <div key={project.id}>
            <h1>{project.name}</h1>
            <p>{project.description}</p>
          </div>
        </Link>
      ))}
      <AddProjectForm />
    </div>
  );
};

export default Projects;
