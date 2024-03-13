const express = require("express");
const {
  getAllUserBlogs,
  getOneUserBlog,
  createNewBlogItem,
  editBlogItem,
  removeBlogItem,
  userBlogController,
} = require("../controller/blogController");
const router = express.Router();

router
  .get("/user-blogs/:id", userBlogController)
  .get("/users-blogs", getAllUserBlogs)
  .get("/user-blog/:id", getOneUserBlog)
  .post("/add-blog", createNewBlogItem)
  .put("/edit-blog/:id", editBlogItem)
  .delete("/remove-blog/:id", removeBlogItem);

module.exports = router;
