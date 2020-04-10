import React, { useState, useEffect } from "react";
import AddProjectForm from "../components/AddProjectForm";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";

const Projects = () => {
  const [projects, setProjects] = useState([]);

  const history = useHistory();

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/projects")
      .then((res) => {
        console.log(res);
        setProjects(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const deleteProject = (id) => {
    axios
      .delete(`http://localhost:8000/api/projects/${id}`)
      .then((res) => {
        console.log(res);
        history.push("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      {projects.map((project) => (
        <Link to={`/details/${project.id}`}>
          <div key={project.id}>
            <h1>{project.name}</h1>
            <p>{project.description}</p>
          </div>
          <button onClick={() => deleteProject(project.id)}>
            Delete Project
          </button>
        </Link>
      ))}
      <AddProjectForm />
    </div>
  );
};

export default Projects;
