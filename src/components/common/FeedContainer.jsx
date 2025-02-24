import { Box, Card } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

function FeedContainer({ children, extraCSS}) {
  
  const dispatch = useDispatch();
  return (
    <Card
      sx={{
        background: "#1B2730",
        padding: "15px 25px",
        borderRadius: "10px",
        color: "#fff",
        width: "50%",
        mb: 2,
      }}
    >
      <Box sx={{ ...extraCSS, width: "100%" }}>{children}</Box>
    </Card>
  );
}

export default FeedContainer;
