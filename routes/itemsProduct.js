const express = require('express')
const router = express.Router()
const upload = require('../middleware/uploadMiddleware')
const { itemsController, itemsEditController, deleteTheCategory } = require('../controllers/itemsController')

router.post("/categories/:selectedCateg/products", upload.single('image'), itemsController
);
router.put("/categories/:selectedCateg/editProducts", upload.single('image'), itemsEditController);
router.delete("/categories/:editCategory/deleteCategory",deleteTheCategory)
module.exports = router