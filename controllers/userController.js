const restaurant = require("../schema/restaurant");
const user = require("../schema/user");
const bcrypt = require('bcrypt');

exports.userControlller = async (req, res) => {
  try {
    const { email, password, restaurantName } = req.body;
    const normalizedRestaurantName = restaurantName.replace(/\s+/g, '').toLowerCase();

    // Check for existing restaurant name
    const existingRestaurant = await restaurant.findOne({ 
      nameWithOutSpace: { $regex: new RegExp(`^${normalizedRestaurantName}$`, 'i') }, // Case-insensitive regex match
     });

    if (existingRestaurant) {
      return res.status(409).send('Restaurant name already exists'); // Conflict status code for duplicates
    }

    // Check for existing user email
    const existingUser = await user.findOne(
      { 
        email: { $regex: new RegExp(`^${email}$`, 'i') }, // Case-insensitive regex match

      });
    if (existingUser) {
      return res.status(409).send('Email already exists'); // Use 409 for conflict
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const trialExpiresAt = new Date();
    trialExpiresAt.setDate(trialExpiresAt.getDate() + 7);
    console.log("Trial expires at:", trialExpiresAt);

    // Create new user
    const userInfoStore = new user({ email: email, password: hashedPassword, restaurantName: restaurantName, trialExpiresAt });
    await userInfoStore.save();

    // Create new restaurant
    const createNewRestaurant = new restaurant({
      name: restaurantName,
      nameWithOutSpace:normalizedRestaurantName,
      ownerId: userInfoStore._id,
    });
    await createNewRestaurant.save();



    // Respond with success
    res.status(201).send("User created and restaurant created");

  } catch (error) {
    console.error("Error in user registration:", error); // Log the actual error for debugging
    res.status(500).send("User registration error"); // Send 500 status for server errors
  }
};
