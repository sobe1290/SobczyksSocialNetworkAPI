const router = require('express').Router();
const userRoutes = require('./userRoutes');
const thoughtRoutes = require('./thoughtRoutes');
// Tells the routes where to find go next
router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;
