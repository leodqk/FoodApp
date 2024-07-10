const userModels = require("../models/userModels");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerController = async (req, res) => {
  try {
    // validate request
    const { username, email, password, phone, address } = req.body;
    if (!username || !email || !password || !phone || !address) {
      return res.status(500).send({
        success: false,
        message: "Please provide all required fields",
      });
    }

    // check if user already exists
    const existing = await userModels.findOne({ email });
    if (existing) {
      return res.status(500).send({
        success: false,
        message: "User already exists",
      });
    }
    // hash password
    var salt = bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hash(password, salt);
    // register user
    const user = await userModels.create({
      username,
      email,
      password: hashPassword,
      phone,
      address,
    });
    res.status(201).send({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in registering user",
      err,
    });
  }
};

// LOGIN
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // validate request
    if (!email || !password) {
      return res.status(500).send({
        success: false,
        message: "Please provide email and password",
      });
    }

    // check user

    const user = await userModels.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found ",
      });
    }

    // check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(404).send({
        success: false,
        message: "User not found or wrong password",
      });
    }

    // generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    user.password = undefined;
    res.status(200).send({
      success: true,
      message: "User logged in successfully",
      token,
      user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in login user",
      err,
    });
  }
};

module.exports = { registerController, loginController };
