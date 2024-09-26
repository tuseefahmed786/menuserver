const express = require('express')
const router = express.Router()
const icons = require("../controllers/icons")

router.get("/icons", icons.getIcons)

module.exports = router