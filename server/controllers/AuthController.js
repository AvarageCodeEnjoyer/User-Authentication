const User = require("../models/UserModel")
const bcrypt = require("bcryptjs")
const { createSecretToken } = require("../util/secretToken")

module.exports.Signup = async (req, res, next) => {
  try{
    const { email, password, username, createdAt } = req.body
    if (!email || !password || !username) {
      return res.json({ message: "All fields are required" })
    }
    const existingUser = await User.findOne({ email })
    if (existingUser) res.json({ message: "User already exists"})
    const user = User.create(req.body)
    const token = createSecretToken(user._id)
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    })
    res.status(201).json({ 
      message: "User signed up successfully",
      success: true,
      user
    })
    next()
  } catch(error) {
    console.error(error)
  }
}

module.exports.Login = async (req, res, next) => {
  try{
    const { email, password } = req.body
    if (!email || !password ) {
      return res.json({ message: "All fields are required" })
    }
    const user = await User.findOne({ email })
    if (!user) res.json({ message: "incorrect password or email" })
    const auth = await bcrypt.compare(password, user.password)
    if (!auth) return res.json({ message: "incorrect password or email" })
    const token = createSecretToken(user._id)
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    })
    res.status(201).json({ 
      message: "User signed in successfully",
      success: true
    })
    next()
  } catch(error) {
    console.error(error)
  }
}