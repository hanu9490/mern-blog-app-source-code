const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const blogRoutes = require("./routes/blogRotes");
const path = require("path");

//server
const app = express();

//middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

//routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/blog", blogRoutes);

//env config
dotenv.config();

//db connection
connectDB();

app.use(express.static(path.join(__dirname, "./client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

//PORT
const PORT = process.env.PORT || 8080;
app.listen(PORT, () =>
  console.log(
    `Server running on ${process.env.DEV_MODE} at port ${PORT}`.bgYellow.red
  )
);
