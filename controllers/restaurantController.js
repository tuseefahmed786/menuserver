const restaurant = require('../schema/restaurant');

exports.restaurantController = async (req, res) => {
    try {
        const { restaurantName, country, currency } = req.body.formData;
        const userId = req.user.userId;
     
        const normalizedRestaurantName = restaurantName.replace(/\s+/g, '').toLowerCase();

        const existingRestaurant = await restaurant.findOne({ ownerId: userId });

        if (!existingRestaurant) {
            return res.status(404).json({ message: "Restaurant not found." });
        }

        // Check if a different restaurant already has the same normalized name
        const nameExists = await restaurant.findOne({
            nameWithOutSpace: { $regex: new RegExp(`^${normalizedRestaurantName}$`, 'i') },
            _id: { $ne: existingRestaurant._id }
        });

        if (nameExists) {
            return res.status(409).json({ message: "Restaurant name already exists. Please choose a different name." });
        }

        // Update the existing restaurant's details
        existingRestaurant.name = restaurantName || existingRestaurant.name;
        existingRestaurant.nameWithOutSpace = normalizedRestaurantName
        existingRestaurant.country = country || existingRestaurant.country;
        existingRestaurant.currency = currency || existingRestaurant.currency;
        // existingRestaurant.logo = wait


        await existingRestaurant.save();

        return res.status(200).json({ message: "Restaurant updated successfully", restaurant: existingRestaurant });

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

exports.uploadTheLogo = async (req,res)=>{
    try {
        const restaurantId = req.user.userId;
        console.log(restaurantId + "df3d")
        const logoUrl = req.file.path; // Cloud URL of the uploaded image
        const existingRestaurant = await restaurant.findOne({ ownerId: restaurantId });
        existingRestaurant.logo = logoUrl;

        // Save the updated restaurant
        const updatedRestaurant = await existingRestaurant.save();
    
        console.log(updatedRestaurant + "updatedRestaurant")

        if (!updatedRestaurant) {
            return res.status(404).json({ message: "Restaurant not found" });
        }

        res.status(200).json({
            message: "Logo uploaded successfully!",
            logoUrl: updatedRestaurant.logo, // Return the updated logo URL
        });
    } catch (error) {
        
    }
}