import React from "react";
import "../../assets/css/feed.css";
import FeedContainer from "../common/FeedContainer";
import ProfileImage from "../../assets/images/demo-profile.jpg";
import PostContainer from "../posts/PostContainer";
import { Textarea } from "@mui/joy";
import { Box, TextField } from "@mui/material";

function Feed() {
  return (
    <>
      Hello
      <FeedContainer extraCSS={{ display: "flex", gap: "30px" }}>
        <img
          className="profile-picture"
          height={"50px"}
          width={"50px"}
          src={ProfileImage}
          alt="Profile Picture of user"
          loading="lazy"
        />
        <TextField  sx={{width: '100%', bgcolor: 'white', borderRadius:2}} multiline/>
      </FeedContainer>
      <PostContainer />
      <PostContainer />
      <PostContainer />
    </>
  );
}

export default Feed;
