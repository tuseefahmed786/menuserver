const express = require('express')
const router = express.Router()
const upload = require('../middleware/uploadMiddleware')
const { itemsController, itemsEditController, deleteTheProduct } = require('../controllers/itemsController')

router.post("/categories/:selectedCateg/products", upload.single('image'), itemsController);
router.put("/categories/:selectedCateg/editProducts", upload.single('image'), itemsEditController);
router.delete("/api/:productId/deletedProduct", deleteTheProduct)

module.exports = router