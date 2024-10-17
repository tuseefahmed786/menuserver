const express = require('express')
const authMiddleware = require('../middleware/auth')
const { isValidToken } = require('../controllers/isValidToken')
const router = express.Router()

router.get("/verifytoken",authMiddleware, isValidToken)
module.exports = router