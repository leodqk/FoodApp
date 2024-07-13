// Get user info

const userModels = require("../models/userModels");
const bcrypt = require("bcryptjs");

const getUSerController = async (req, res) => {
  try {
    const user = await userModels.findById({ _id: req.body.id });
    if (!user) {
      res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    user.password = undefined;
    res.status(200).send({
      success: true,
      message: "User info",
      user,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in getting user info",
      error,
    });
  }
};

// Update user info

const updateUserController = async (req, res) => {
  try {
    // find user
    const user = await userModels.findById({ _id: req.body.id });
    if (!user) {
      res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
    // update

    const { username, address, phone } = req.body;
    if (username) user.username = username;
    if (address) user.address = address;
    if (phone) user.phone = phone;

    // save user
    await user.save();
    res.status(200).send({
      success: true,
      message: "User info updated successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in updating user info",
      error,
    });
  }
};

const updatePasswordController = async (req, res) => {
  try {
    //find user
    const user = await userModels.findById({ _id: req.body.id });
    //valdiation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User Not Found",
      });
    }
    // get data from user
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res.status(500).send({
        success: false,
        message: "Please Provide Old or New PasswOrd",
      });
    }
    //check user password  | compare password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(500).send({
        success: false,
        message: "Invalid old password",
      });
    }
    //hashing password
    var salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save();
    res.status(200).send({
      success: true,
      message: "Password Updated!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Password Update API",
      error,
    });
  }
};

const resetPasswordController = async (req, res) => {
  try {
    const { email, newPassword, answer } = req.body;
    if (!email || !newPassword || !answer) {
      return res.status(500).send({
        success: false,
        message: "Please Provide Email, New Password and Answer",
      });
    }
    const user = await userModels.findOne({ email, answer });
    if (!user) {
      return res.status(500).send({
        success: false,
        message: "Invalid Email or Answer",
      });
    }
    var salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save();
    res.status(200).send({
      success: true,
      message: "Password Reset Successfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Reset Password API",
      error,
    });
  }
};

const deleteUserController = async (req, res) => {
  try {
    await userModels.findByIdAndDelete({ _id: req.params.id });
    return res.status(200).send({
      success: true,
      message: "User Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Delete User API",
      error,
    });
  }
};

module.exports = {
  getUSerController,
  updateUserController,
  updatePasswordController,
  resetPasswordController,
  deleteUserController,
};
