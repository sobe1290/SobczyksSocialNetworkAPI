const { Schema, model } = require('mongoose');
const moment = require('moment');

// Creates the schema for the reaction subdocument
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
    createdAt: {
      type: Date,
      default: Date.now,
      get: (time) => moment(time).format('MMMM Do YYYY, h:mm:ss a'),
      // Moment JS to format the time
    },
  },
  {
    toJSON: {
      getters: true,
    },
    timestamps: true,
  },

  // Creates the Schema for a thought
);
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
      get: (time) => moment(time).format('MMMM Do YYYY, h:mm:ss a'),
      // Use a getter method to format the timestamp on query
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],

    // Subdocument of reactionSchema is brought in here

  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  },
);

// Virtual to add together the amount of reactions in the array
thoughtSchema
  .virtual('reactionCount')
  .get(function () {
    return this.reactions.length;
  });

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
