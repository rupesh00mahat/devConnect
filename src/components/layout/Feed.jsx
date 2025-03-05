import React, { useEffect, useRef, useState } from "react";
import "../../assets/css/feed.css";
import FeedContainer from "../common/FeedContainer";
import ProfileImage from "../../assets/images/demo-profile.jpg";
import PostContainer from "../posts/PostContainer";
import { Box, Grid, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { createNewPost } from "../../redux/middleware/postInterationThunk";
import { AddPhotoAlternate } from "@mui/icons-material";
import ButtonTwo from "../common/ButtonTwo";
import FollowSuggestions from "../../layouts/FollowSuggestions/FollowSuggestions";
import { v4 as uuidv4 } from "uuid";

function Feed() {
  const newPostRef = useRef(null);
 

  const dispatch = useDispatch();
  const uid = useSelector((state) => state.uid);
  const feedPosts = useSelector((state) => state.feedPosts);
  const email = useSelector((state) => state.email);
  const userName = useSelector((state) => state.userName);

  const [postsToShow, setPostsToShow] = useState(feedPosts);

  useEffect(()=>{
    setPostsToShow(feedPosts);
  }, [feedPosts])

  return (
    <>
      <Grid container spacing={20}>
        <Grid item xs={8}>
          <FeedContainer>
            <Box sx={{ width: "100%", display: "flex", gap: "30px" }}>
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
                inputProps={{ style: { color: "white" } }}
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
                  const newId = uuidv4();

                  dispatch(
                    createNewPost(
                      newPostRef.current.value,
                      uid,
                      email,
                      userName,
                      newId
                    )
                  );
                }}
              />

              <ButtonTwo
                icon={<AddPhotoAlternate color="#36D5A8" />}
                text="Add Photo"
                onClick={() => {}}
              />
            </Box>
          </FeedContainer>
          {postsToShow &&
            postsToShow.map(({ text, postId, fullName, likes, email, date, comments, posterId }, index) => {
              return <PostContainer key={`${text}-${index}`} text={text}
              postId={postId}
              fullName={fullName}
              likes={likes}
              email={email}
              date={date}
              comment={comments}
              userId={uid}
              posterId={posterId}
              setPostsToShow={setPostsToShow}
              postsToShow={postsToShow}
              />;
            })}
        </Grid>
        <Grid item xs={4} sx={{ pl: "10px !important" }}>
          <FollowSuggestions />
        </Grid>
      </Grid>
    </>
  );
}

export default Feed;
