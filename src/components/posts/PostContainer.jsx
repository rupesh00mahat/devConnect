import React, { useEffect, useRef, useState } from "react";
import FeedContainer from "../common/FeedContainer";
import ProfileImage from "../../assets/images/demo-profile.jpg";
import { Box, IconButton, TextField, Typography } from "@mui/material";
import ButtonOne from "../common/ButtonOne";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AllInclusiveIcon from "@mui/icons-material/AllInclusive";
import CommentIcon from "@mui/icons-material/Comment";
import { useDispatch, useSelector } from "react-redux";
import {
  likePost,
  commentPost,
  removeLike,
  deleteComment,
  deletePost,
} from "../../redux/middleware/postInterationThunk";
import { toast } from "react-toastify";
import ButtonTwo from "../common/ButtonTwo";
import { v4 as uuidv4 } from "uuid";
import { Delete } from "@mui/icons-material";

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
  postsToShow, setPostsToShow
}) {
  const dispatch = useDispatch();
  const newCommentRef = useRef(null);
  const [comments, showComments] = useState(false);
  const [commentList, setCommentList] = useState(comment);
  const [isLiked, setIsLiked] = useState(likes.includes(userId));
  const userEmail = useSelector((state) => state.email);
  const uid = useSelector((state) => state.uid);
  const removeComment = (commentId) => {
    dispatch(deleteComment(userId, postId, posterId, commentId));
    const newCommentList = commentList.filter(
      (comment) => comment.commentId !== commentId
    );
    setCommentList(newCommentList);
  };

  const handleLike = () => {
    if (isLiked) {
      toast.success(
        "Already Liked !!!!!. You cannot like the post again or unlike it."
      );
      dispatch(removeLike(userId, postId, posterId));
      setIsLiked(false);
    } else {
      dispatch(likePost(userId, postId, posterId));
      setIsLiked(true);
    }
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
        newid,
        userEmail
      )
    );
    newCommentRef.current.value = "";
  };

  const removePost = () => {
      dispatch(deletePost(postId, uid))
      let newPosts = postsToShow.filter((post)=> post.postId !== postId);
      setPostsToShow(newPosts);
  }

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
              <FavoriteIcon color={`${isLiked ? "secondary" : ""}`} size={20} />
            }
            text={`(${
              isLiked
                ? likes.includes(userId)
                  ? likes.length
                  : likes.length + 1
                : likes.includes(userId)
                ? likes.length - 1
                : likes.length
            }) ${isLiked ? "Liked" : "Like"}`}
          />
          <ButtonOne
            onClick={() => {
              showComments((prevState) => !prevState);
            }}
            icon={<CommentIcon size={20} />}
            text={`(${commentList.length}) Comment`}
          />
          {posterId == uid && (
            <ButtonOne
              onClick={removePost}
              icon={<Delete color="error" size={20} />}
              text={"Delete Post"}
            />
          )}
        </Box>
        {comments &&
          commentList &&
          commentList.map(({ comment, commentId, posterEmail }) => {
            return (
              <Box
                key={`${commentId}`}
                sx={{
                  p: 1,
                  borderRadius: 2,
                  border: "1px solid white",
                  mt: 2,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box>
                  <Typography variant="h4" fontSize={"20px"} fontWeight={400}>
                    @{posterEmail}
                  </Typography>
                  <Typography variant="p" fontSize={"16px"} fontWeight={200}>
                    {comment}
                  </Typography>
                </Box>
                {posterEmail == userEmail && (
                  <IconButton onClick={() => removeComment(commentId)}>
                    <Delete color="error" />
                  </IconButton>
                )}
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
