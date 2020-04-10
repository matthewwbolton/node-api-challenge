import React from "react";
import { Route } from "react-router-dom";
import Projects from "./components/Projects";
import ProjectDetails from "./components/ProjectDetails";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Route exact path="/">
        <Projects />
      </Route>
      <Route path="/details/:id">
        <ProjectDetails />
      </Route>
    </div>
  );
}

export default App;
