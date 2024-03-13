const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");

//register user
const registerUser = async (req, res) => {
  try {
    const { name, password, email } = req.body;
    // Validation
    if (!name || !password || !email) {
      return res.status(400).send({
        success: false,
        message: "Please provide all the details",
      });
    }
    //existing-user
    const existsUser = await userModel.findOne({ email });
    if (existsUser) {
      return res.status(409).send({
        success: false,
        message: "User already registered!",
      });
    }
    //create-newUser
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    return res.status(201).send({
      success: true,
      message: "Created New User",
      newUser,
    });
  } catch (error) {
    console.log(`Error in Registering The User ${error}`);
    res.status(500).send({
      success: false,
      message: "Server Error",
    });
  }
};

//get Users
const getUsers = async (req, res) => {
  try {
    const getUsers = await userModel.find({});
    return res.status(200).send({
      success: true,
      message: "success fully got the users",
      getUsers,
    });
  } catch (error) {
    console.log(`Error in getting all users ${error}`);
    return res.status(500).send({
      success: false,
      error,
    });
  }
};

//login user
const loginUser = async (req, res) => {
  try {
    const { password, email } = req.body;
    let user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).send({
        success: false,
        message: "User not Registered",
      });
    }
    //password Validation
    const isValidPass = await bcrypt.compare(password, user.password);
    if (!isValidPass) {
      return res.status(400).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    return res.status(200).send({
      success: true,
      message: "Login user successfully",
      user,
    });
  } catch (error) {
    console.log("Error In Login : ", error);
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error,
    });
  }
};

module.exports = {
  getUsers,
  registerUser,
  loginUser,
};
