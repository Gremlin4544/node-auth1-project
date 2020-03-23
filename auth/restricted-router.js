const express = require('express');
const restricted = require('./auth/restricted-middleware.js');

const router = express.Router({
    mergeParams: true
});

router.use(restricted);

router.get('/message', (req, res) => {
    res.status(200).json({message: 'You are in a  restricted section'});
});

module.exports = router;