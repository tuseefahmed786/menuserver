const restaurant = require('../schema/restaurant');

exports.restaurantController = async (req, res) => {
    try {
        const { restaurantName, country, currency } = req.body.formData;
        const userId = req.user.userId;
        const existingRestaurant = await restaurant.findOne({ ownerId: userId });

        // Check if a different restaurant already has the same name
        if (restaurantName) {
            const nameExists = await restaurant.findOne({
                name: { $regex: new RegExp(`^${restaurantName}$`, 'i') }, // Case-insensitive regex match
                _id: { $ne: existingRestaurant?._id } // Exclude the current restaurant if editing
            });

            if (nameExists) {
                return res.status(409).json({ message: "Restaurant name already exists. Please choose a different name." });
            }
        }

        if (existingRestaurant) {
            existingRestaurant.name = restaurantName || existingRestaurant.name;
            existingRestaurant.country = country || existingRestaurant.country;
            existingRestaurant.currency = currency || existingRestaurant.currency;

            await existingRestaurant.save();
            return res.status(200).json({ message: "Restaurant updated successfully", restaurant: existingRestaurant });
        }

        // If no existing restaurant, create a new one
        const createNewRestaurant = new restaurant({
            name: restaurantName,
            country: country,
            currency: currency,
            ownerId: userId
        });

        await createNewRestaurant.save();
        res.status(201).json({ message: "Restaurant created successfully", restaurant: createNewRestaurant });
    } catch (error) {
        res.status(500).json({ message: "Error processing request: " + error });
    }
};

exports.getRestaurantData = async (req, res) => {
   try {
    const userId = req.user.userId;
    const getRestaurant = await restaurant.findOne({ ownerId: userId });
    res.status(200).json({ message: "Restaurant details", restaurant: getRestaurant });
   } catch (error) {
    console.log(error)
   }
}