import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import axios from "axios";
import toast from "react-hot-toast";

const CreateBlog = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    image: "",
  });

  const onChangeInput = (e) => {
    setInputs((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const id = localStorage.getItem("userId");
      const { data } = await axios.post("api/v1/blog/add-blog/", {
        title: inputs.title,
        description: inputs.description,
        imageUrl: inputs.image,
        user: id,
      });
      if (data?.success) {
        toast.success("blog created Successfully");
        navigate("/my-blogs");
      }
    } catch (error) {
      console.log(error);
    }
  };

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
          Create a blog
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
        <TextField name="image" value={inputs.image} onChange={onChangeInput} />
        <Button
          color={"success"}
          sx={{ mt: 2 }}
          type="submit"
          variant="contained"
        >
          Create
        </Button>
      </Box>
    </form>
  );
};

export default CreateBlog;
