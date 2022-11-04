const { connect, connection } = require('mongoose');

// Establishes connection with MongoDB
connect('mongodb://localhost/socialnetwork', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;
