const e = require("express");
const mongoose = require("mongoose");

//schema

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "Please provide a username"],
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
    },
    address: {
      type: Array,
      required: [true, "Please provide an address"],
    },
    phone: {
      type: String,
      required: [true, "Please provide a phone number"],
    },
    userType: {
      type: String,
      required: [true, "Please provide a user type"],
      default: "clinet",
      enum: ["clinet", "admin", "vendor", "driver"],
    },
    profile: {
      type: String,
      default:
        "https://scontent.fhan17-1.fna.fbcdn.net/v/t39.30808-6/239862493_574477643928177_360216203018058284_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=a5f93a&_nc_ohc=_JtGY1xngEoQ7kNvgHTr786&_nc_ht=scontent.fhan17-1.fna&oh=00_AYB-LaTrk27Dl8cneRErq9rVSBsYJZzO77tDXPN06jhymg&oe=6693E6B3",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
