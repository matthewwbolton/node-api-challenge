const projects = require("../data/helpers/projectModel");

function validateProjectID(req, res, next) {
  projects
    .get(req.params.id)
    .then((project) => {
      project
        ? next()
        : res.status(400).json({
            error: "The project with the specified ID cannot be found.",
          });
    })
    .catch((err) =>
      res.status(500).json({
        error:
          "The server was unable to validate the project associated with that ID.",
      })
    );
}

function validateProject(req, res, next) {
  req.body.name && req.body.description
    ? next()
    : res.status(404).json({
        error:
          "Bad Request: You are missing either the name or description or both and therefor you cannot create a new project at this time.",
      });
}

module.exports = { validateProject, validateProjectID };
