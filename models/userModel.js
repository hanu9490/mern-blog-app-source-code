const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: { type: String, required: [true, "Username is required"] },
    password: { type: String, required: [true, "Password is required"] },
    email: { type: String, required: [true, "Email is required"] },
    blogs: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Blog",
      },
    ],
  },
  { timestamps: true }
);

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
