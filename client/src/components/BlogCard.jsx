import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import { Box, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BlogCard = ({ blog, userNameWord, isUser, id }) => {
  const navigate = useNavigate();
  const handleEdit = () => {
    navigate(`/edit-blog/${id}`);
  };

  const handleDlete = async () => {
    try {
      const { data } = await axios.delete(`/api/v1/blog/remove-blog/${id}`);

      if (data?.success) {
        alert("Blog deleted successfully");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Card
      sx={{
        width: "40%",
        flexWrap: "wrap",
        margin: 5,
        boxShadow: "5px 5px 10px #ccc",
      }}
    >
      {isUser && (
        <Box display={"flex"} paddingRight={"10px"}>
          <IconButton
            sx={{ marginLeft: "auto", marginRight: "5px" }}
            onClick={handleEdit}
          >
            <EditIcon color="info" />
          </IconButton>
          <IconButton onClick={handleDlete}>
            <DeleteIcon color="error" />
          </IconButton>
        </Box>
      )}
      <CardHeader
        avatar={
          <Avatar
            sx={{ bgcolor: red[500], textTransform: "capitalize" }}
            aria-label="recipe"
          >
            {userNameWord}
          </Avatar>
        }
        title={blog.title}
        subheader="September 14, 2016"
      />
      <CardMedia
        component="img"
        height="150"
        image={blog.imageUrl}
        alt="Paella dish"
      />
      <CardContent>
        <Typography>{blog.description}</Typography>
      </CardContent>
    </Card>
  );
};

export default BlogCard;
