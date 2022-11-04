const router = require('express').Router();
// All of the logic for the thought routes are brought in here
const {
  createThought,
  getThoughts,
  getSingleThought,
  updateThought,
  deleteThought,
  createReaction,
  removeReaction,
} = require('../../controllers/thoughtController.js');

// Routes to get all thoughts and create a thought
router.route('/').get(getThoughts).post(createThought);

// Routes to get a single thought, update, and delete, all by id
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

// Routes to add a reaction or delete a reaction by a specific thought by id
router.route('/:thoughtId/reactions').post(createReaction).delete(removeReaction);

module.exports = router;
