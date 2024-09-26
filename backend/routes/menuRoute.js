const {createMenu} = require('../controllers/menuController')
const express = require('express')
const router = express.Router()

router.post('/createMenu',createMenu)
module.exports = router