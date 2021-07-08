const express = require('express');
const router = express.Router();

module.exports = (db, isAuthenticated) => {
    router.use('/users', require('./users')(db, isAuthenticated));

    return router;
};
