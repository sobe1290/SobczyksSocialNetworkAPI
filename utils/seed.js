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

    }
];

const seedThoughts = [
    {

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
