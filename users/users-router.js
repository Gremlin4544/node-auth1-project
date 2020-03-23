const router = require("express").Router();

const Users = require("./users-model.js");

router.get("/", (req, res) => {
  console.log("Qui Gon - its working! Its working!");
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

module.exports = router;