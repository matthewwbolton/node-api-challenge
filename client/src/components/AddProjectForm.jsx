import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const AddProjectForm = () => {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => console.log(data);

  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
  });

  const handleChanges = (e) => {
    setNewProject({ ...newProject, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    axios
      .post("http://localhost:8000/api/projects", newProject)
      .then((res) => {
        console.log("This is res from POST", res);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <form onSubmit={handleSubmit(submitHandler)}>
        <label>Name:</label>
        <input
          onChange={handleChanges}
          name="name"
          ref={register({ required: true })}
          value={newProject.name}
        />
        {errors.name && <span>This field is required</span>}
        <label>Description:</label>
        <input
          onChange={handleChanges}
          name="description"
          ref={register({ required: true })}
          value={newProject.description}
        />
        {errors.description && <span>This field is required</span>}
        <input type="submit" />
      </form>
    </div>
  );
};

export default AddProjectForm;
