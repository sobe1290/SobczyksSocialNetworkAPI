const router = require('express').Router();
// Calls in the logic for all of the user routes
const {
  createUser,
  getUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require('../../controllers/userController.js');

// Routes to get all users and create a user
router.route('/').get(getUsers).post(createUser);

// Routes to get a single user, update a user, and delete a user all by id
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

// Routes to add a friend or delete a friend to a specific user by id
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;
