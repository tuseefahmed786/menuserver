const menu = require('../schema/menu')
const restaurant = require('../schema/restaurant')

exports.createMenu = async (req, res) => {
    try {
        const { username, menuName } = req.body
        const findResId = await restaurant.findOne({ username: username })
        if (!findResId) {
            return res.status(404).send("Restaurant not found Please Login");
        }
        const createNewMenu = new menu({
            name: menuName
        })
        const savedMenu = await createNewMenu.save()
        findResId.menus.push(savedMenu._id);
        await findResId.save()
         res.status(201).send("menu created")

    } catch (error) {
res.send(error)
    }
}