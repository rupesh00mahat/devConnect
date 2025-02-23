import { Box, Button } from "@mui/material";
import React from "react";
function ButtonOne({ onClick, text, icon }) {
  return (
    <Button
      onClick={onClick}
      sx={{
        display: "flex",
        gap: "5px",
        alignContent: "center",
        padding: "13px 25px",
        background: "#28353E",
        width: '100%',
        color: '#fff'

      }}
    >
      {icon}
      <Box>{text}</Box>
    </Button>
  );
}

export default ButtonOne;
