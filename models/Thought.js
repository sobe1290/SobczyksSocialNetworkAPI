const {Schema, model}= require('mongoose');
const moment = require('moment');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),

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
            get: (time) => moment(time).format('mm do yyyy, h:mm:ss a')
            //Use a getter method to format the timestamp on query
        }
    },
    {
        toJSON: {
            getters: true,
          },
          timestamps: true,
    }

    //will be used as the reaction field's subdocument schema in the Thought model.
)
const thoughtSchema = new Schema(
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
            get: (time) => moment(time).format('mm do yyyy, h:mm:ss a')
            //Use a getter method to format the timestamp on query
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],

            //Array of nested documents created with the reactionSchema

    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
          },
          id: false,
    }
)

thoughtSchema
    .virtual('reactionCount')
    .get(function() {
        return this.reactions.length
    })

//Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.



const Thought = model("Thought", thoughtSchema);

module.exports = Thought;