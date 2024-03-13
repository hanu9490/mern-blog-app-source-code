import React, { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import axios from "axios";
import { Box } from "@mui/material";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  const getAllBlogs = async () => {
    try {
      const { data } = await axios.get("/api/v1/blog/users-blogs");

      if (data?.success) {
        setBlogs(data?.blogs);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch blogs when the component mounts.
  useEffect(() => {
    getAllBlogs();
  }, []);

  return (
    <Box
      display={"flex"}
      flexDirection={{ xs: "column", md: "row" }}
      flexWrap={"wrap"}
      justifyContent={"space-evenly"}
    >
      {blogs.map((blog) => {
        return (
          <BlogCard
            key={blog._id}
            id={blog._id}
            blog={blog}
            userNameWord={blog.user.name[0]}
            isUser={blog.user._id === localStorage.getItem("userId")}
          />
        );
      })}
    </Box>
  );
};

export default Blogs;
