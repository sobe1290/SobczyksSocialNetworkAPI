const Thought = require('../models/Thought');
const User = require('../models/User');

module.exports = {
  // Logic to get all thoughts
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  // Logic to get one thought by id
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .then((user) => (!user
        ? res.status(404).json({ message: 'No thought with that ID' })
        : res.json(user)))
      .catch((err) => res.status(500).json(err));
  },

  // Logic to create a thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => User.findOneAndUpdate(
        { _id: req.body.userId },
        { $addToSet: { thoughts: thought._id } },
        { new: true },
      ))
      .then((user) => (!user
        ? res.status(404).json({
          message: 'Thought created, but found no user with that ID',
        })
        : res.json('Created the thought')))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Logic to update a single thought by id
  updateThought(req, res) {
    Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { thoughtText: req.body.thoughtText })
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
  },

  // Logic to delete a single thought by id
  deleteThought(req, res) {
    Thought.findOneAndDelete(
      { _id: req.params.thoughtId },
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

  // Logic to create a reaction for a specific thought
  createReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { new: true },
    )
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
  },
  // Logic to remove a specific reaction from a specific thought
  removeReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { _id: req.body.reactionId } } },
      { new: true },
    )
      .then((thought) => (!thought
        ? res.status(404).json({ message: 'No reaction with this id!' })
        : res.json(thought)))
      .catch((err) => res.status(500).json(err));
  },
};
