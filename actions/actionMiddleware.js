const actions = require("../data/helpers/actionModel");

function validateActionId(req, res, next) {
  actions
    .get(req.params.id)
    .then((action) => {
      action ? next() : res.status(400).json({ error: "Invalid action ID" });
    })
    .catch((err) =>
      res.status(500).json({
        error: "The server cannot validate the ID associated with this action.",
      })
    );
}

function validateAction(req, res, next) {
  req.body.description && req.body.notes
    ? next()
    : res.status(400).json({
        error:
          "One of the required fields is missing therefore this operation cannot be completed",
      });
}

module.exports = { validateActionId, validateAction };
