const express = require('express')
const router = express.Router()
const { fetchMenu } = require('../controllers/fetchMenuController')

router.get("/menu/:restaurantName",fetchMenu)
module.exports = router