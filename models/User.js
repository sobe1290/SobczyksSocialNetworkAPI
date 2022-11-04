const { Schema, model } = require('mongoose');

// function to validate the email field with an email regex
const validateEmail = function (email) {
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return regex.test(email);
};

// Creates the schema for users
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [validateEmail, 'Please enter a valid email'],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],

  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  },
);

// Virtual to add together the amount of friends in the array of that user
userSchema
  .virtual('friendCount')
  .get(function () {
    return this.friends.length;
  });

const User = model('User', userSchema);

module.exports = User;
