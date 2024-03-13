import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { authActions } from "../redux/store";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/user/login", {
        email: formData.email,
        password: formData.password,
      });

      if (data?.success) {
        localStorage.setItem("userId", data.user._id);
        dispatch(authActions.isLogin());
        toast.success("User login successfully");
        navigate("/blogs");
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
          paddingBottom={7}
        >
          <Typography variant="h4" textTransform={"uppercase"}>
            Login
          </Typography>
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
          <Button
            sx={{ marginTop: "10px" }}
            onClick={() => navigate("/register")}
          >
            Don't have account? Please Rigester
          </Button>
        </Box>
      </form>
    </>
  );
};

export default Login;
