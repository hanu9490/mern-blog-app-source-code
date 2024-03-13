import React, { useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../redux/store";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

const Header = () => {
  const [blogTab, setBlogTab] = useState();
  let isLogin = useSelector((state) => state.isLogin);
  isLogin = isLogin || localStorage.getItem("userId");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(authActions.isLogout());
    navigate("/login");
    toast.success("user successfully loggedOut!");
    localStorage.clear("userId");
  };
  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h4">My Blog App</Typography>
          {isLogin && (
            <Box display={"flex"} marginLeft={"auto"} marginRight={"auto"}>
              <Tabs
                value={blogTab}
                textColor="inherit"
                onChange={(e, val) => setBlogTab(val)}
              >
                <Tab label="Blogs" LinkComponent={Link} to={"/blogs"} />
                <Tab label="My Blogs" LinkComponent={Link} to={"/my-blogs"} />
                <Tab
                  label="Create Blog"
                  LinkComponent={Link}
                  to={"/create-blog"}
                />
              </Tabs>
            </Box>
          )}
          <Box display="flex" marginLeft="auto">
            {!isLogin && (
              <>
                <Button
                  sx={{ margin: 1, color: "white" }}
                  LinkComponent={Link}
                  to="/register"
                >
                  Register
                </Button>
                <Button
                  sx={{ margin: 1, color: "white" }}
                  LinkComponent={Link}
                  to="login"
                >
                  Login
                </Button>
              </>
            )}

            {isLogin && (
              <Button sx={{ margin: 1, color: "white" }} onClick={onLogout}>
                Logout
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
