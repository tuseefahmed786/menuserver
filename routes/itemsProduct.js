const express = require('express')
const router = express.Router()
const upload = require('../middleware/uploadMiddleware')
const { itemsController } = require('../controllers/itemsController')

router.post("/categories/:selectedCateg/products",upload.single('image'),itemsController
);

module.exports = router