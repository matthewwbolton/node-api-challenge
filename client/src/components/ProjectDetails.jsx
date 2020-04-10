import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProjectDetails = () => {
  const [details, setDetails] = useState({});
  const [actions, setActions] = useState();
  const params = useParams();
  console.log(params.id);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/projects/${params.id}`)
      .then((res) => {
        console.log(res);
        setDetails(res.data);
      })
      .catch((err) => console.log(err));
  }, [params.id]);
  console.log("actions", details.actions);

  return (
    <div>
      <h1>{details.name}</h1>
      <p>{details.description}</p>
      {/* {details.actions.map((elem) => (
        <div key={elem.id}>
          <h4>{elem.description}</h4>
        </div>
      ))} */}
    </div>
  );
};

export default ProjectDetails;
