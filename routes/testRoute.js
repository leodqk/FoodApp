const express = require("express");
const { testUserController } = require("../controllers/exampleController");

const router = express.Router();

// routes
router.get("/test-user", testUserController);

module.exports = router;
