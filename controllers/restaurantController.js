const restaurantModel = require("../models/restaurantModel");

const createRestaurantController = async (req, res) => {
  try {
    const {
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    } = req.body;
    if (!title || !coords) {
      return res.status(400).send({
        success: false,
        message: "Please provide title and address.",
      });
    }

    // const restaurant = new restaurantModel({
    //   title,
    //   imageUrl,
    //   foods,
    //   time,
    //   pickup,
    //   delivery,
    //   isOpen,
    //   logoUrl,
    //   rating,
    //   ratingCount,
    //   code,
    //   coords,
    // });
    // await restaurant.save();
    const restaurant = await restaurantModel.create({
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    });
    res.status(201).send({
      success: true,
      message: "Restaurant created successfully.",
      restaurant,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in creating restaurant.",
      error,
    });
  }
};

const getAllRestaurantController = async (req, res) => {
  try {
    const restaurants = await restaurantModel.find();
    if (!restaurants) {
      return res.status(404).send({
        success: false,
        message: "No restaurant found.",
      });
    }
    res.status(200).send({
      success: true,
      message: "All restaurant",
      restaurants,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting all restaurant",
      error,
    });
  }
};

const getRestaurantByIdController = async (req, res) => {
  try {
    const restaurant = await restaurantModel.findById({ _id: req.params.id });
    if (!restaurant) {
      return res.status(404).send({
        success: false,
        message: "Restaurant not found.",
      });
    }
    res.status(200).send({
      success: true,
      message: "Restaurant by id",
      restaurant,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting restaurant by id",
      error,
    });
  }
};

const deleteRestaurantController = async (req, res) => {
  try {
    const restaurant = await restaurantModel.findByIdAndDelete({
      _id: req.params.id,
    });
    if (!restaurant) {
      return res.status(404).send({
        success: false,
        message: "Restaurant not found.",
      });
    }
    res.status(200).send({
      success: true,
      message: "Restaurant deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in deleting restaurant",
      error,
    });
  }
};

module.exports = {
  createRestaurantController,
  getAllRestaurantController,
  getRestaurantByIdController,
  deleteRestaurantController,
};
