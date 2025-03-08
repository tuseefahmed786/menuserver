const express = require("express");
const router = express.Router();
const restaurantController = require("../controllers/restaurantController");
const authMiddleware = require("../middleware/auth");
const upload = require("../middleware/uploadMiddleware");
// const upload = require('../middleware/uploadMiddleware');

router.post(
  "/restaurant",
  authMiddleware,
  restaurantController.restaurantController
);
router.get(
  "/api/restaurantData",
  authMiddleware,
  restaurantController.getRestaurantData
);
router.post(
  "/api/uploadLogo",
  upload.fields([
    { name: "logo", maxCount: 1 },
    { name: "cover", maxCount: 1 },
  ]),
  authMiddleware,
  restaurantController.uploadTheLogo
);
module.exports = router;