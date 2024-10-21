const restaurant = require("../schema/restaurant");
const user = require("../schema/user");
const bcrypt = require('bcrypt');

exports.userControlller = async (req, res) => {
  try {
    const { email, password, restaurantName } = req.body;

    // Check for existing restaurant name
    const existingRestaurant = await restaurant.findOne({ 
      name: { $regex: new RegExp(`^${restaurantName}$`, 'i') }, // Case-insensitive regex match

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

    // Create new user
    const userInfoStore = new user({ email: email, password: hashedPassword, restaurantName: restaurantName });
    await userInfoStore.save();

    // Create new restaurant
    const createNewRestaurant = new restaurant({
      name: restaurantName,
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
