import { Box, Button } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { handleSignIn } from "../../redux/middleware/authThunk";
import { toast } from "react-toastify";
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
          
        if(returnedId){
          toast.success('User successfully Logged In');
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
