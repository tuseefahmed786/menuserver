const Restaurant = require('../schema/restaurant')
const Category = require('../schema/Category');

exports.fetchMenu = async (req, res) => {
    try {
        const { restaurantName } = req.params
        console.log("params", restaurantName)
        const normalizedRestaurantName = restaurantName.replace(/\s+/g, '').toLowerCase();
        console.log(normalizedRestaurantName)
        const findrestaurant = await Restaurant.findOne({
            nameWithOutSpace: { $regex: new RegExp(`^${normalizedRestaurantName}$`, 'i') }
        })
        console.log("data", findrestaurant)

        if (!findrestaurant) {
            return res.status(403).send("this param is a wrong we can't find restaurant")
        }
        const getcatandProducts = await Category.find({ ownerId: findrestaurant.ownerId }).populate('products')
        res.json(getcatandProducts);

    } catch (error) {

    }
}