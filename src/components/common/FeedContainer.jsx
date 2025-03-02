import { Box, Card } from "@mui/material";
import React from "react";

function FeedContainer({ children, extraCSS}) {
  
  return (
    <Card
      sx={{
        background: "#1B2730",
        borderRadius: "10px",
        color: "#fff",
        maxWidth: "100%",
        mb: 2,
        p:2
      }}
    >
      <Box sx={{ ...extraCSS, width: "100%" }}>{children}</Box>
    </Card>
  );
}

export default FeedContainer;
