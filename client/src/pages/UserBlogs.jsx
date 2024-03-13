import React, { useEffect, useState } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";

const UserBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [nameWord, setNameWord] = useState();

  const getUserBlogs = async () => {
    try {
      const id = localStorage.getItem("userId");
      const { data } = await axios.get(`/api/v1/blog/user-blogs/${id}`);
      if (data?.success) {
        setBlogs(data.userBlog.blogs);
        setNameWord(data.userBlog.name[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserBlogs();
  }, []);

  return (
    <div>
      {blogs && blogs.length > 0 ? (
        blogs.map((blog) => (
          <BlogCard
            key={blog._id}
            id={blog._id}
            blog={blog}
            userNameWord={nameWord}
            isUser={true}
          />
        ))
      ) : (
        <h1 style={{ textAlign: "center", marginTop: "10%" }}>
          No blogs there! create a Blog
        </h1>
      )}
    </div>
  );
};

export default UserBlogs;
