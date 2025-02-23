import { Box, Button } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { handleSignIn } from "../../redux/middleware/authThunk";
function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(()=>{console.log('hello')},[])

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
      }}
    >
      <Button
        variant="contained"
        onClick={async () => {
          const returnedId = await dispatch(handleSignIn());
          console.log('returned Id', returnedId);
        if(returnedId){
         navigate('/feed');
        }
        }}
      >
        Login
      </Button>
    </Box>
  );
}

export default Login;
