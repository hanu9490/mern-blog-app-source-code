const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"],
    },
    description: {
      type: String,
      required: [true, "description is required"],
    },
    imageUrl: {
      type: String,
      default: "https://via.placeholder.com/640x360",
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "user id is required"],
    },
  },
  { timestamps: true }
);

const blogModel = mongoose.model("Blog", blogSchema);

module.exports = blogModel;
