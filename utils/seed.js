const mongoose = require('mongoose');
const Users = require('../models/User');
const Thoughts = require('../models/Thought')

mongoose
    .connect('mongodb://localhost:27017/socialnetwork', {
        useNewURLParser: true,
        useUnifiedTopology: true
    })
    .then (() => {
        console.log('Mongo Connection Open!');
    })
    .catch((err) => {
        console.log(err);
    });

const seedUsers = [
    {
        "thoughts":[],
        "friends": [],
        "username" : "lernantino",
        "email": "lernantino@gmail.com",
        "friendCount" : 0,
    },
    {
        "thoughts":[],
        "friends": [],
        "username" : "Amiko",
        "email" : "amiko@gmail.com",
        "friendCount" : 0,
    }
];

const seedThoughts = [
    {
        "thoughtText": "Thoughts are the words of our minds",
        "username": "Amiko",
        "reactions": [],
        "__v": 0,
        "reactionCount": 0
    },
    {
        "thoughtText": "Here's a cool thought...",
        "username": "lernantino",
        "reactions": [],
        "__v": 0,
        "reactionCount": 0
    }
];

const seedDB = async () => {
    await Users.deleteMany({});
    await Users.insertMany(seedUsers);
    await Thoughts.deleteMany({});
    await Thoughts.insertMany(seedThoughts);
};

seedDB().then(() => {
    mongoose.connection.close();
})
