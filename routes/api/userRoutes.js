const router = require('express').Router();
const {
  createUser,
  getUsers,
  getSingleUser,
} = require('../../controllers/userController.js');

router.route('/').get(getUsers).post(createUser);

router.route('/:userId').get(getSingleUser);

//PUT to update a user by its _id

//DELETE to remove user by its _id

///api/users/:userId/friends/:friendId
//POST to add a new friend to a user's friend list
//DELETE to remove a friend from a user's friend list

module.exports = router;
