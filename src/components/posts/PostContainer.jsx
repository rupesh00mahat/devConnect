import React, { useRef, useState } from "react";
import FeedContainer from "../common/FeedContainer";
import ProfileImage from "../../assets/images/demo-profile.jpg";
import { Box, TextField, Typography } from "@mui/material";
import ButtonOne from "../common/ButtonOne";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AllInclusiveIcon from "@mui/icons-material/AllInclusive";
import CommentIcon from "@mui/icons-material/Comment";
import { useDispatch } from "react-redux";
import {
  likePost,
  commentPost,
} from "../../redux/middleware/postInterationThunk";
import { toast } from "react-toastify";
import ButtonTwo from "../common/ButtonTwo";
import { v4 as uuidv4 } from "uuid";

function PostContainer({
  text,
  image = null,
  postId,
  fullName,
  likes,
  email,
  date,
  comment,
  userId,
  posterId,
}) {
  const dispatch = useDispatch();
  const newCommentRef = useRef(null);
  const [comments, showComments] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  
  const handleLike = () => {
   if(!isLiked){
    if (likes.includes(userId)) {
      toast.success(
        "Already Liked !!!!!. You cannot like the post again or unlike it."
      );
    } else {
      dispatch(likePost(userId, postId, posterId));
    }
   }

    setIsLiked(true);

  };

  const addComment = () => {
    const newid = uuidv4();
    dispatch(
      commentPost(
        userId,
        postId,
        posterId,
        newCommentRef.current.value,
        new Date(),
        newid
      )
    );
    newCommentRef.current.value = "";
  };

  return (
    <FeedContainer
      extraCSS={{ display: "flex", wrap: "flex-wrap", gap: "30px" }}
    >
      <img
        className="profile-picture"
        src={image || ProfileImage}
        height={"50px"}
        width={"50px"}
      />
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            marginBottom: "2px",
          }}
        >
          <Typography fontSize={"22px"} variant="h3">
            {fullName}
          </Typography>
          <Typography color="#617079" fontSize={"15px"} variant="p">
            @{email}
          </Typography>
        </Box>
        <Typography variant="p" sx={{ marginBottom: "10px", color: "#617079" }}>
          {date}
        </Typography>
        <Typography variant="p" sx={{ marginBottom: "10px", fontSize: "18px" }}>
          {text}
        </Typography>
        {image && (
          <img
            className="post-image"
            src={ProfileImage}
            width={"100%"}
            height={"450px"}
          />
        )}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "10px",
            marginTop: "20px",
          }}
        >
          <ButtonOne
            onClick={handleLike}
            icon={
              <FavoriteIcon
                color={`${likes.includes(userId) || isLiked ? "secondary" : ""}`}
                size={20}
              />
            }
            text={`(${isLiked ? likes.length+1 : likes.length}) ${
              likes.includes(userId) || isLiked ? "Liked" : "Like"
            }`}
          />
          <ButtonOne icon={<AllInclusiveIcon size={20} />} text={"Retweet"} />
          <ButtonOne
          onClick={()=>{showComments(prevState => !prevState)}}
            icon={<CommentIcon size={20} />}
            text={`(${comment.length}) Comment`}
          />
        </Box>
        {comments && comment &&
          comment.map(({ comment, commentId }) => {
            return (
              <Box
              key={`${commentId}`}
              sx={{p: 1, borderRadius: 2, border: '1px solid white', mt:2}}
              >
                <Typography variant="h4" fontSize={"20px"} fontWeight={400}>
                  Comment
                </Typography>
                <Typography variant="p" fontSize={"16px"} fontWeight={200}>
                  {comment}
                </Typography>
              </Box>
            );
          })}
        <Box
          sx={{
            minWidth: "100%",
            mt: 2,
            display: "flex",
            gap: 2,
            justifyContent: "center",
            alignItems: "start",
          }}
        >
          <TextField
            inputRef={newCommentRef}
            sx={{
              width: "100%",
              bgcolor: "white",
              borderRadius: 2,
              width: "80%",
            }}
            inputProps={{
              style: { color: "black", border: "none" },
            }}
            multiline
          />
          <ButtonTwo
            onClick={addComment}
            extraCSS={{ backgroundColor: "#4153AF", maxWidth: "20%" }}
            text={"Add Comment"}
          />
        </Box>
      </Box>
    </FeedContainer>
  );
}

export default PostContainer;
