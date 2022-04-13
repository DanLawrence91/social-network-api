const { User, Thought, Reaction } = require("../models");

module.exports = {
  // Gets all users in database
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },

  // Gets a single user by their userID
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .then((user) => (!user ? res.status(404).json({ message: "No user with that ID" }) : res.json(user)))
      .catch((err) => res.status(500).json(err));
  },

  // Creates a new user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },

  // Updates a user
  updateUser(req, res) {
    User.findOneAndUpdate({ _id: req.params.userId }, { $set: req.body }, { runValidators: true, new: true })
      .then((user) => (!user ? res.status(404).json({ message: "No user with that ID" }) : res.json(user)))
      .catch((err) => res.status(500).json(err));
  },

  // Deletes a user
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) => (!user ? res.status(404).json({ message: "no user with that ID" }) : Thought.deleteMany({ _id: { $in: user.thoughts } })))
      .then(() => res.json({ message: "User and their thoughts deleted" }))
      .catch((err) => res.status(500).json(err));
  },
};
