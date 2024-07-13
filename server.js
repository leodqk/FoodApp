const express = require("express");
const colors = require("colors");
const cors = require("cors");
const morgan = require("morgan");
const { connect } = require("mongoose");
const { connectDB } = require("./config/mongodb");
const dotenv = require("dotenv").config();

const app = express();

// connect to MongoDB
connectDB();

// middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// server
const hostname = "localhost";
const port = process.env.PORT || 3000;

// routes
app.get("/", (req, res) => {
  res.end("<h1>Hello World!</h1><hr>");
});

app.use("/api/v1/auth", require("./routes/authRoute"));
app.use("/api/v1/user", require("./routes/userRoute"));

app.listen(port, hostname, () => {
  // eslint-disable-next-line no-console
  console.log(`Hello, I am running at ${hostname}:${port}/`.white.bgGreen);
});
