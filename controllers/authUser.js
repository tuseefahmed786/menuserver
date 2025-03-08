const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const router = express.Router();

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
    const token = jwt.sign({ userId: req.user._id }, process.env.JWT_KEY, { expiresIn: '30d' });
    res.redirect(`http://localhost:3000/dashboard/home?token=${token}`);
});

module.exports = router;


