const express = require("express");

const authMiddlewares = require("../middlewares/authMiddlewares");
const {
  createRestaurantController,
  getAllRestaurantController,
  getRestaurantByIdController,
  deleteRestaurantController,
} = require("../controllers/restaurantController");

const router = express.Router();

router.post("/create", authMiddlewares, createRestaurantController);
router.get("/getAll", authMiddlewares, getAllRestaurantController);
router.get("/getOne/:id", authMiddlewares, getRestaurantByIdController);
router.delete("/deleteOne/:id", authMiddlewares, deleteRestaurantController);

module.exports = router;
