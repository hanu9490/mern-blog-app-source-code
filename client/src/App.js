import React from "react";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Blogs from "./pages/Blogs";
import Rigester from "./pages/Rigester";
import UserBlogs from "./pages/UserBlogs";
import CreateBlog from "./pages/CreateBlog";
import UpdateBlog from "./pages/UpdateBlog";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <div>
      <Header />
      <Toaster />
      <Routes>
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/my-blogs" element={<UserBlogs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<Login />} />
        <Route path="/register" element={<Rigester />} />
        <Route path="/create-blog" element={<CreateBlog />} />
        <Route path="/edit-blog/:id" element={<UpdateBlog />} />
      </Routes>
    </div>
  );
};

export default App;
