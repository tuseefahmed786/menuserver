const express = require('express');
const router = express.Router();
const { subscriptionStripe } = require('../controllers/subscriptionStripe');

router.post('/create-checkout-session', subscriptionStripe)
module.exports = router