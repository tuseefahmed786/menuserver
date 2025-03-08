const express = require('express')
const { socialLink } = require('../controllers/socialLink')
const authMiddleware = require('../middleware/auth')
const router = express.Router()

router.post('/api/socialLink', authMiddleware, socialLink)
module.exports = router