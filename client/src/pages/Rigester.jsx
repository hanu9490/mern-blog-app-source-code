import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Rigester = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  //handle input state

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  //handle submit data

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/user/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      if (data?.success) {
        toast.success("User Regestered Successfully");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box
          display={"flex"}
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          boxShadow={"10px 10px 20px #ccc"}
          maxWidth={500}
          margin={"auto"}
          marginTop={7}
          paddingTop={4}
          paddingBottom={5}
        >
          <Typography variant="h4" textTransform={"uppercase"}>
            Regester
          </Typography>
          <TextField
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            type="text"
            label="name"
            margin="normal"
          />
          <TextField
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            type="text"
            label="E-mail"
            margin="normal"
          />
          <TextField
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            type="password"
            label="Password"
            margin="normal"
          />
          <Button type="submit" variant="contained" sx={{ marginTop: "10px" }}>
            Submit
          </Button>
          <Button sx={{ marginTop: "10px" }} onClick={() => navigate("/login")}>
            Already regestered? Please login
          </Button>
        </Box>
      </form>
    </>
  );
};

export default Rigester;
