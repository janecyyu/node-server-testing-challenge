const router = require("express").Router();
const Users = require("./model");

router.get("/", (req, res) => {
  Users.find()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => res.send(err));
});

router.post("/", (req, res) => {
  Users.add(req.body)
    .then((users) => {
      res.status(201).json(users);
    })
    .catch((err) => res.send(err));
});

router.delete("/:id", (req, res) => {
  Users.remove(req.params.id)
    .then((users) => {
      res.status(200).json({ message: "delete successfully" });
    })
    .catch((err) => res.send(err));
});

module.exports = router;
