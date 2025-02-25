import React, { useEffect, useRef } from "react";
import "../../assets/css/feed.css";
import FeedContainer from "../common/FeedContainer";
import ProfileImage from "../../assets/images/demo-profile.jpg";
import PostContainer from "../posts/PostContainer";
import { Box, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { createNewPost } from "../../redux/middleware/postInterationThunk";
import { AddPhotoAlternate } from "@mui/icons-material";
import ButtonTwo from "../common/ButtonTwo";

function Feed() {
  const newPostRef = useRef(null);
  useEffect(() => {
    console.log("newPostREf", newPostRef.current.value);
  }, [newPostRef]);

  const dispatch = useDispatch();
  const {uid} = useSelector((state)=> state.uid);
  const feedPosts = useSelector((state)=> state.feedPosts);
console.log('feedPosts', feedPosts);
  return (
    <>
      <FeedContainer>
        <Box width={'100%'} sx={{ display: 'flex', gap: '30px'}}>
          <img
            className="profile-picture"
            height={"50px"}
            width={"50px"}
            src={ProfileImage}
            alt="Profile Picture of user"
            loading="lazy"
          />
          <TextField
          color="white"
            inputRef={newPostRef}
            sx={{
              width: "100%",
              bgcolor: "#28353E",
              borderRadius: 2,
            }}
            inputProps={{style: {color: 'white'}}}
            multiline
          />
        </Box>
        <Box
          sx={{
            mt: 1,
            display: "flex",
            justifyContent: "space-between",
            gap: "25px",
            marginLeft: "80px",
          }}
        >
          <ButtonTwo
            extraCSS={{ backgroundColor: "#4153AF" }}
            text="Post"
            onClick={() => {
              dispatch(createNewPost(newPostRef.current.value, uid));
            }}
          />

          <ButtonTwo
            icon={<AddPhotoAlternate color="#36D5A8" />}
            text="Add Photo"
            onClick={()=>{}}
          />
        </Box>
      </FeedContainer>
      {feedPosts   && feedPosts .map(({text}, index)=>{
        return <PostContainer key={`${text}-${index}`} text={text}/>
      })}
     
    </>
  );
}

export default Feed;
