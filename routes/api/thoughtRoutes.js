const router = require('express').Router();
const {
  createThought,
  getThoughts,
  getSingleThoughts,
} = require('../../controllers/thoughtController.js');

router.route('/').get(getThoughts).post(createThoughts);

router.route('/:thoughtId').get(getSingleThought);

//PUT to update a user by its _id

//DELETE to remove user by its _id

///api/users/:userId/friends/:friendId
//POST to add a new friend to a user's friend list
//DELETE to remove a friend from a user's friend list

module.exports = router;
