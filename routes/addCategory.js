const express = require('express')
const router = express.Router()
const categoryController = require("../controllers/categoryController")
const authMiddleware = require('../middleware/auth')

router.post("/addCategory", authMiddleware, categoryController.addCategory)
router.get("/categories", authMiddleware, categoryController.allCategory)
router.put("/updatedCategory/:categoryId", authMiddleware, categoryController.editCategory)
router.delete("/categories/:editCategory/deleteCategory", categoryController.deleteTheCategory)

module.exports = router