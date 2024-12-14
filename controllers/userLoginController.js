const user = require("../schema/user")
const harsh = require('bcrypt')
const jwt = require('jsonwebtoken')
const restaurant = require("../schema/restaurant")
require('dotenv').config()
exports.userLoginController = async (req, res) => {
    try {
        const { email, password } = req.body
        const userFound = await user.findOne({ email })
        if (!userFound) {
            return res.status(400).send("User is not found in the database")
        }
        // const findRestaurant = await restaurant.findOne({ ownerId: userFound._id })
        const isValidPass = await harsh.compare(password, userFound.password)
        if (!isValidPass) {
            return res.status(401).send("Password is not correct")
        }

        const token = jwt.sign({ userId: userFound._id }, process.env.JWT_KEY, {
            expiresIn: '30d',
        })

        res.json({ token })
    } catch (error) {
        console.error("Login error: ", error)
        res.status(500).send("An error occurred during login")
    }
}
