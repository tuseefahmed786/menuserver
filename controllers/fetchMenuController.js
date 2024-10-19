const Restaurant = require('../schema/restaurant')
const Category = require('../schema/Category');

exports.fetchMenu = async (req,res) =>{
    try {
        const { restaurantName } = req.params
        const findrestaurant = await Restaurant.findOne({
            name: { $regex: new RegExp(`^${restaurantName}$`, 'i') }
        })
        if (!restaurantName) {
           return res.status(403).send("this param is a wrong we can't find restaurant")
        }
        const getcatandProducts = await Category.find({ ownerId: findrestaurant.ownerId }).populate('products')
        res.json(getcatandProducts);

    } catch (error) {
        
    }
}