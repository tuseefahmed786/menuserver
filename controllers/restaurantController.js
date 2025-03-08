const restaurant = require("../schema/restaurant");
const socialLinks = require("../schema/socialLinks");
const user = require("../schema/user");
exports.restaurantController = async (req, res) => {
  try {
    const { restaurantName, country, currency, about, location } =
      req.body.formData;
    const userId = req.user.userId;
console.log("about us this " + about + location)
    const normalizedRestaurantName = restaurantName
      .replace(/\s+/g, "")
      .toLowerCase();

    const existingRestaurant = await restaurant.findOne({ ownerId: userId });

    if (!existingRestaurant) {
      return res.status(404).json({ message: "Restaurant not found." });
    }

    // Check if a different restaurant already has the same normalized name
    const nameExists = await restaurant.findOne({
      nameWithOutSpace: {
        $regex: new RegExp(`^${normalizedRestaurantName}$`, "i"),
      },
      _id: { $ne: existingRestaurant._id },
    });

    if (nameExists) {
      return res.status(409).json({
        message:
          "Restaurant name already exists. Please choose a different name.",
      });
    }

    // Update the existing restaurant's details
    existingRestaurant.name = restaurantName || existingRestaurant.name;
    existingRestaurant.nameWithOutSpace = normalizedRestaurantName;
    existingRestaurant.country = country || existingRestaurant.country;
    existingRestaurant.currency = currency || existingRestaurant.currency;
    existingRestaurant.about = about || existingRestaurant.about;
    existingRestaurant.location = location || existingRestaurant.location;

    await existingRestaurant.save();

    return res.status(200).json({
      message: "Restaurant updated successfully",
      restaurant: existingRestaurant,
    });
  } catch (error) {
    res.status(500).json({ message: "Error processing request: " + error });
  }
};

exports.getRestaurantData = async (req, res) => {
  try {
    const userId = req.user.userId;
    const getRestaurant = await restaurant.findOne({ ownerId: userId });
    const userFound = await user.findOne({ _id: userId });
    const social = await socialLinks.findOne({ userId: userId });
    console.log(social);
    const now = new Date();
    let daysLeft;
    if (userFound.subscriptionType == "free_trial") {
      if (userFound.trialExpiresAt < now) {
        daysLeft = "expiry";
      } else {
        const leftDay = Math.ceil(
          (userFound.trialExpiresAt - now) / (1000 * 60 * 60 * 24)
        );
        daysLeft = leftDay;
      }
    }
    res.status(200).json({
      message: "Restaurant details",
      restaurant: getRestaurant,
      daysLeft,
      userFound,
      social,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.uploadTheLogo = async (req, res) => {
  try {
    const restaurantId = req.user.userId;

    // Extract the uploaded files
    const files = req.files;

    // Find the restaurant associated with the logged-in user
    const existingRestaurant = await restaurant.findOne({
      ownerId: restaurantId,
    });

    if (!existingRestaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    // Update logo and cover URLs if provided
    if (files.logo && files.logo[0]) {
      existingRestaurant.logo = files.logo[0].path; // Cloudinary provides the URL in the `path` field
    }

    if (files.cover && files.cover[0]) {
      existingRestaurant.cover = files.cover[0].path; // Cloudinary provides the URL in the `path` field
    }

    // Save the updated restaurant document
    const updatedRestaurant = await existingRestaurant.save();

    res.status(200).json({
      message: "Images uploaded successfully!",
      logoUrl: updatedRestaurant.logo,
      coverUrl: updatedRestaurant.cover,
    });
  } catch (error) {
    console.error("Error uploading images:", error);
    res.status(500).json({ message: "Failed to upload images" });
  }
};
