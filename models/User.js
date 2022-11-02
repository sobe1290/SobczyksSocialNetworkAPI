const mongoose = require('mongoose');

const validateEmail = function(email) {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(email);
  };

const userSchema = new mongoose.Schema(
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
            validate: [validateEmail, "Please enter a valid email"],
        },
        thoughts: [
            {
                type: 'Thought',
                ref: 'Thought',
                //thoughts: Array of _id values referencing the Thought model
            }
        ],
        friends: [
            {
                type: x,
                ref: x,
                //friends: Array of _id values referencing the User model (self-reference)
            },
        ],
        
        
   
        
    }
)

//Create a virtual called friendCount that retrieves the length of the user's friends array field on query.

module.exports = mongoose.model("User", userSchema);