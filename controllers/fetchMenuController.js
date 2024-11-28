const Restaurant = require('../schema/restaurant')
const Category = require('../schema/Category');

exports.fetchMenu = async (req, res) => {
    try {
        const { restaurantName } = req.params
        const normalizedRestaurantName = restaurantName.replace(/\s+/g, '').toLowerCase();
        const findrestaurant = await Restaurant.findOne({
            nameWithOutSpace: { $regex: new RegExp(`^${normalizedRestaurantName}$`, 'i') }
        })

        if (!findrestaurant) {
            return res.status(403).send("this param is a wrong we can't find restaurant")
        }
        const getcatandProducts = await Category.find({ ownerId: findrestaurant.ownerId }).populate('products')
        res.json({getcatandProducts,findrestaurant});

    } catch (error) {

    }
}