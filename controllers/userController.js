const User = require('../models/User');

module.exports = {
  // Logic to get all Users
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  // Logic to get a single user by id
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .then((user) => (!user
        ? res.status(404).json({ message: 'No user with that ID' })
        : res.json(user)))
      .catch((err) => res.status(500).json(err));
  },
  // Logic to create a user
  createUser(req, res) {
    User.create(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
  },
  // Logic to update a user by id
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { username: req.body.username, email: req.body.email },
    )
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
  },
  // Logic to delete a user by id
  deleteUser(req, res) {
    User.findOneAndDelete(
      { _id: req.params.userId },
      (err, result) => {
        if (result) {
          res.status(200).json(result);
          console.log(`Deleted: ${result}`);
        } else {
          console.log('Uh Oh, something went wrong');
          res.status(500).json({ error: 'Something went wrong' });
        }
      },
    );
  },
  // Logic to add a friend to the friend array for a specific user
  addFriend(req, res) {
    User.findOneAndUpdate({ _id: req.params.userId }, { $push: { friends: req.params.friendId } })
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
  },
  // Logic to remove a friend from an array of a specific user
  removeFriend(req, res) {
    User.findOneAndUpdate({ _id: req.params.userId }, { $pull: { friends: req.params.friendId } })
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
  },
};
