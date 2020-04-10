const express = require("express");
const validate = require("./actionMiddleware");

const actions = require("../data/helpers/actionModel");
const projects = require("../data/helpers/projectModel");

const router = express.Router();

////////////////  READ  /////////////////////////////////////

router.get("/", (req, res) => {
  actions
    .get()
    .then((action) => {
      res.status(200).json(action);
    })
    .catch((err) =>
      res.status(500).json({
        error:
          "There was an error with the server while processing your request.",
      })
    );
});

router.get("/:id", validate.validateActionId, (req, res) => {
  actions
    .get(req.params.id)
    .then((action) => res.status(200).json(action))
    .catch((err) => {
      res.status(500).json({ error: "Internal Server Error" });
    });
});

///////////////////  CREATE  ////////////////////////////////////////

router.post("/", validate.validateAction, (req, res) => {
  actions
    .insert(req.body)
    .then((action) => {
      res.status(201).json(action);
    })
    .catch((err) => {
      res.status(500).json({ error: "Internal Server Error" });
    });
});

/////////////////////  UPDATE  ////////////////////////////////////////

router.put("/:id", validate.validateActionId, (req, res) => {
  actions
    .update(req.params.id, req.body)
    .then((action) => {
      actions.get(req.params.id).then((action) => res.status(201).json(action));
    })
    .catch((err) => {
      res.status(500).json({ error: "Internal Server Error" });
    });
});

////////////////////////  DELETE  ////////////////////////////////////////

router.delete("/:id", validate.validateActionId, (req, res) => {
  actions
    .remove(req.params.id)
    .then((action) => {
      actions
        .get(req.params.id)
        .then((action) =>
          res
            .status(200)
            .json(
              `The action action with id ${req.params.id} has been deleted from the database.`
            )
        );
    })
    .catch((err) => res.status(500).status({ error: "Internal Server Error" }));
});

//Write middleware functions here
// function validateActionId(req, res, next) {
//   actions
//     .get(req.params.id)
//     .then((action) => {
//       action ? next() : res.status(400).json({ error: "Invalid action ID" });
//     })
//     .catch((err) =>
//       res.status(500).json({
//         error: "The server cannot validate the ID associated with this action.",
//       })
//     );
// }

// function validateAction(req, res, next) {
//   req.body.description && req.body.notes
//     ? next()
//     : res.status(400).json({
//         error:
//           "One of the required fields is missing therefore this operation cannot be completed",
//       });
// }

module.exports = router;
