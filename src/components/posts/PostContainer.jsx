import React from "react";
import FeedContainer from "../common/FeedContainer";
import ProfileImage from "../../assets/images/demo-profile.jpg";
import { Box, Typography } from "@mui/material";
import ButtonOne from "../common/ButtonOne";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AllInclusiveIcon from "@mui/icons-material/AllInclusive";
import CommentIcon from '@mui/icons-material/Comment';

function PostContainer() {
  return (
    <FeedContainer extraCSS={{ display: "flex", gap: "30px", mt: 2 }}>
      <img
        className="profile-picture"
        src={ProfileImage}
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
            HYPEBEAST
          </Typography>
          <Typography color="#617079" fontSize={"15px"} variant="p">
            @HYPEBEAST
          </Typography>
        </Box>
        <Typography variant="p" sx={{ marginBottom: "10px", color: "#617079" }}>
          2 hours ago
        </Typography>
        <Typography variant="p" sx={{ marginBottom: "10px", fontSize: '18px' }}>
          Sole Mates: Ralph Suguitan and the Nike KD 4 "Easter"
        </Typography>
        <img
          className="post-image"
          src={ProfileImage}
          width={"100%"}
          height={"450px"}
        />
         <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px', marginTop: '20px'}}>
        <ButtonOne icon={<FavoriteIcon size={20} />} text={"Like"} />
        <ButtonOne icon={<AllInclusiveIcon size={20} />} text={"Retweet"} />
        <ButtonOne icon={<CommentIcon size={20} />} text={"Comment"} />
      </Box>
      </Box>
     
    </FeedContainer>
  );
}

export default PostContainer;
