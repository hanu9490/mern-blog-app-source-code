import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import axios from "axios";
import toast from "react-hot-toast";

const UpdateBlog = () => {
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    image: "",
  });

  const navigate = useNavigate();
  const id = useParams().id;

  const onChangeInput = (e) => {
    setInputs((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const getUserBlog = async () => {
    try {
      const { data } = await axios.get(`/api/v1/blog/user-blog/${id}`);
      if (data?.success) {
        setInputs({
          title: data.blog.title,
          description: data.blog.description,
          image: data.blog.imageUrl,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId");
    console.log(userId);
    console.log(id);
    const { data } = await axios.put(`/api/v1/blog/edit-blog/${id}`, {
      title: inputs.title,
      description: inputs.description,
      imageUrl: inputs.image,
    });
    if (data?.success) {
      toast.success("blog updated Successfully");
      navigate("/my-blogs");
    }
  };

  useEffect(() => {
    getUserBlog();
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <Box
        width={"60%"}
        display={"flex"}
        flexDirection={"column"}
        gap={2}
        justifyContent={"center"}
        margin={"auto"}
        marginTop={10}
        boxShadow={"10px 10px 20px #8888"}
        padding={7}
        borderRadius={5}
      >
        <Typography variant="h5" textAlign={"center"}>
          Edit blog
        </Typography>
        <InputLabel sx={{ fontSize: "20px", fontWeight: "bold" }}>
          Title
        </InputLabel>
        <TextField
          name="title"
          value={inputs.title}
          onChange={onChangeInput}
          required
        />
        <InputLabel sx={{ fontSize: "20px", fontWeight: "bold" }}>
          Description
        </InputLabel>
        <TextField
          name="description"
          value={inputs.description}
          onChange={onChangeInput}
          required
        />

        <InputLabel sx={{ fontSize: "20px", fontWeight: "bold" }}>
          Image
        </InputLabel>
        <TextField
          name="image"
          value={inputs.image}
          onChange={onChangeInput}
          required
        />
        <Button
          color={"warning"}
          sx={{ mt: 2 }}
          type="submit"
          variant="contained"
        >
          Update
        </Button>
      </Box>
    </form>
  );
};

export default UpdateBlog;
