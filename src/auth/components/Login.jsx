import { Box, Button, TextField } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import {
  handleSignIn,
  handleSignInManual,
} from "../../redux/middleware/authThunk";
import { toast } from "react-toastify";
import { Controller, useForm } from "react-hook-form";
function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({ defaultValues: { userName: "", password: "" } });

  useEffect(() => {}, []);

  const handleLogin = async () => {
    const returnedId = await dispatch(handleSignIn());

    if (returnedId) {
      toast.success("User successfully Logged In");
      navigate("/feed");
    }
  };

  const handleLoginManual = async (data) => {
    const returnedId = await dispatch(
      handleSignInManual(data.userName, data.password)
    );
    if (returnedId) {
      navigate("/feed");
    }
  };

  return (
    <>
      <Box
        sx={{
          mt: 15,
          mb: 5,
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            maxwidth: "50%",
            width: "50%",
            textAlign: "center",
          }}
          onSubmit={handleSubmit(handleLoginManual)}
        >
          <Controller
            name="userName"
            control={control}
            rules={{ required: "This field is required" }}
            render={({ field }) => (
              <TextField
                fullWidth
                sx={{ mb: 2 }}
                {...field}
                label="User Name"
                variant="outlined"
                error={!!errors.userName}
                helperText={errors.userName ? errors.userName.message : ""}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            rules={{ required: "This field is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                sx={{ mb: 2 }}
                label="Password"
                type="password"
                variant="outlined"
                error={!!errors.password}
                helperText={errors.password ? errors.password.message : ""}
              />
            )}
          />
          <Button fullWidth variant="contained" sx={{ p: 2 }} type="submit">
            Log In
          </Button>
        </form>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button variant="contained" sx={{ p: 2 }} onClick={handleLogin}>
          Login With Email
        </Button>
      </Box>
    </>
  );
}

export default Login;
