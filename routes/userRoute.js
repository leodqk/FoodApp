const express = require("express");
const {
  getUSerController,
  updateUserController,
  updatePasswordController,
  resetPasswordController,
  deleteUserController,
} = require("../controllers/userController");
const authMiddlewares = require("../middlewares/authMiddlewares");

const router = express.Router();

// GET USER
router.get("/getUser", authMiddlewares, getUSerController);

router.put("/updateUser", authMiddlewares, updateUserController);

router.post("/updatePassword", authMiddlewares, updatePasswordController);

router.post("/resetPassword", authMiddlewares, resetPasswordController);

router.delete("/deleteUser/:id", authMiddlewares, deleteUserController);

module.exports = router;
