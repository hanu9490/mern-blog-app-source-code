const blogModel = require("../models/blogModel");
const userModel = require("../models/userModel");
const mongoose = require("mongoose");

//get all usersblogs
const getAllUserBlogsController = async (req, res) => {
  try {
    const blogs = await blogModel.find().populate("user");
    if (!blogs) {
      return res.status(404).send({
        success: false,
        message: "No Blog Found",
      });
    }
    return res.status(200).send({
      success: true,
      message: "user blogs Fetched!",
      blogs,
    });
  } catch (error) {
    console.log(`Error occured while getting Blogs ${error}`);
    return res.status(500).send({
      success: false,
      message: "Internal server Error",
    });
  }
};

//get one user blog
const getOneUserBlogController = async (req, res) => {
  try {
    const id = req.params.id;
    const blog = await blogModel.findById(id);
    if (!blog) {
      return res.status(404).send({
        success: false,
        message: `The User with the Id=${id} is not available`,
      });
    }
    return res.status(200).send({
      success: true,
      message: "blog fetched!",
      blog,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Internal Server error",
      error,
    });
  }
};

// create blog
const createNewBlogItemController = async (req, res) => {
  try {
    const { title, description, imageUrl, user } = req.body;
    //   check if all fields are filled
    if (!title || !description || !user) {
      return res.status(400).send({
        success: false,
        message: "Please provide both Title and Description for your post.",
      });
    }
    const existingUser = await userModel.findById(user);
    if (!existingUser) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
    const newBlog = new blogModel({ title, description, imageUrl, user });
    const session = await mongoose.startSession();
    session.startTransaction();
    existingUser.blogs.push(newBlog);
    await newBlog.save({ session });
    await existingUser.save({ session });
    await session.commitTransaction();
    return res.status(200).send({
      success: true,
      message: "Your Blog has been created successfully",
      data: newBlog,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "server failed while creating a Blog",
    });
  }
};

// update Blog
const editBlogItemController = async (req, res) => {
  try {
    const id = req.params.id;
    // const { title, description, imageUrl } = req.body;
    const blog = await blogModel.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    return res.status(200).send({
      success: true,
      message: "updated Blogs",
      blog,
    });
  } catch (error) {
    console.log(error);
    return res.status({
      success: false,
      message: "Server Error",
      error,
    });
  }
};

//delete Blog
const removeBlogItemController = async (req, res) => {
  try {
    const id = req.params.id;
    const blog = await blogModel.findByIdAndDelete(id).populate("user");
    await blog.user.blogs.pull(blog);
    await blog.user.save();
    return res.status(200).send({
      success: true,
      message: "blog deleted Successfully",
      blog,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Failed server to delete the Blog",
      error,
    });
  }
};

// get particular user blogs
const userBlogController = async (req, res) => {
  try {
    const userBlog = await userModel.findById(req.params.id).populate("blogs");
    console.log(userBlog);

    if (!userBlog) {
      return res.status(400).send({
        success: false,
        message: "blogs not found with this user",
      });
    }
    return res.status(200).send({
      success: true,
      message: "Blogs fetched successfully",
      userBlog,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "error in user blog",
      error,
    });
  }
};

module.exports = {
  getAllUserBlogs: getAllUserBlogsController,
  getOneUserBlog: getOneUserBlogController,
  createNewBlogItem: createNewBlogItemController,
  editBlogItem: editBlogItemController,
  removeBlogItem: removeBlogItemController,
  userBlogController,
};
