const express = require("express");
const {
  getUsers,
  registerUser,
  loginUser,
} = require("../controller/userController");
const router = express.Router();

router
  .get("/all-users", getUsers)
  .post("/register", registerUser)
  .post("/login", loginUser);

module.exports = router;
