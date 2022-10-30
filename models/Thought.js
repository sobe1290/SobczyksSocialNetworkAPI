const mongoose = require('mongoose');

const thoughtSchema = new mongoose.Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            //Use a getter method to format the timestamp on query
        },
        username: {
            type: String,
            required: true,
        },
        reactions: {
            //Array of nested documents created with the reactionSchema
        }
    }
)

//Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.

const reactionSchema = new mongoose.Schema (
    {
        reactionId: {
            type: mongoose.ObjectId,
            default: '',

        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt :{
            type: Date, 
            default: Date.now, 
            //Use a getter method to format the timestamp on query
        }
    }

    //will be used as the reaction field's subdocument schema in the Thought model.
)


const Thoughts = model("Thoughts", thoughtSchema);

const Reaction = model ("Reaction", reactionSchema);