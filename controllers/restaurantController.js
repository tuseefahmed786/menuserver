const restaurant = require('../schema/restaurant')
exports.restaurantController = async (req, res) => {
    try {
        const { restaurantName, country, timeZone } = req.body.formData;
        const userId = req.user.userId;
        const existingRestaurant = await restaurant.findOne({ ownerId: userId });

        if (existingRestaurant) {
            existingRestaurant.name = restaurantName || existingRestaurant.name;
            existingRestaurant.country = country || existingRestaurant.country;
            existingRestaurant.timeZone = timeZone || existingRestaurant.timeZone;

            await existingRestaurant.save();
            return res.status(200).json({ message: "Restaurant updated successfully", restaurant: existingRestaurant });
        }

        const createNewRestaurant = new restaurant({
            name: restaurantName,
            country: country,
            timeZone: timeZone,
            ownerId: userId
        });
        await createNewRestaurant.save();
        res.status(201).json({ message: "Restaurant created successfully", restaurant: createNewRestaurant });
    } catch (error) {
        res.status(500).json({ message: "Error processing request: " + error });
    }

}

