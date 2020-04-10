const express = require("express");
const validate = require("./projectMiddleware");

const projects = require("../data/helpers/projectModel");
const actions = require("../data/helpers/actionModel");

const router = express.Router();

/////////////////////////  READ  //////////////////////////////////////

router.get("/", (req, res) => {
  projects
    .get()
    .then((project) => {
      res.status(200).json(project);
    })
    .catch((err) =>
      res.status(500).json({
        error:
          "There was a problem with the server while processing your request.",
      })
    );
});

router.get("/:id", validate.validateProjectID, (req, res) => {
  projects
    .get(req.params.id)
    .then((project) => {
      res.status(200).json(project);
    })
    .catch((err) => {
      res.status(500).json({ error: "Internal Server Error" });
    });
});

router.get("/:id/actions", validate.validateProjectID, (req, res) => {
  projects
    .getProjectActions(req.params.id)
    .then((actions) => {
      res.status(200).json(actions);
    })
    .catch((err) => res.status(500).json({ error: "Internal Server Error" }));
});

//////////////////////////  CREATE  ///////////////////////////////////////////

router.post("/", validate.validateProject, (req, res) => {
  projects
    .insert(req.body)
    .then((project) => {
      res.status(201).json(project);
    })
    .catch((err) => res.status(500).json({ error: "Internal Server Error" }));
});

/////////////////////////  UPDATE  ///////////////////////////////////////////

router.put("/:id", validate.validateProjectID, (req, res) => {
  projects
    .update(req.params.id, req.body)
    .then((project) => {
      res.status(201).json(project);
    })
    .catch((err) => {
      res.status(500).json({ error: "Internal Server Error" });
    });
});

///////////////////////////  DELETE  ///////////////////////////////////////////

router.delete("/:id", validate.validateProjectID, (req, res) => {
  projects
    .remove(req.params.id)
    .then((project) => {
      projects
        .get(req.params.id)
        .then((project) =>
          res
            .status(200)
            .json(
              `The project with id ${req.params.id} has been successfully deleted from the database.`
            )
        );
    })
    .catch((err) => res.status(500).json({ error: "Internal Server Error" }));
});

// Write Middleware Here

// function validateProjectID(req, res, next) {
//   projects
//     .get(req.params.id)
//     .then((project) => {
//       project
//         ? next()
//         : res.status(400).json({
//             error: "The project with the specified ID cannot be found.",
//           });
//     })
//     .catch((err) =>
//       res.status(500).json({
//         error:
//           "The server was unable to validate the project associated with that ID.",
//       })
//     );
// }

// function validateProject(req, res, next) {
//   req.body.name && req.body.description
//     ? next()
//     : res.status(404).json({
//         error:
//           "Bad Request: You are missing either the name or description or both and therefor you cannot create a new project at this time.",
//       });
// }

module.exports = router;
