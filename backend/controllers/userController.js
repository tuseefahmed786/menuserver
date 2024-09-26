const user = require("../schema/user")
const bcrypt = require('bcrypt')
exports.userControlller = async (req, res) => {
  try {
    const { email, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 10);
    const userInfoStore = new user({email: email,password: hashedPassword})
    await userInfoStore.save()
    res.status(201).send("user Created")

  } catch (error) {
    res.status(400).send("user regesiter error")
  }
}
