import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { styled } from "@mui/system";
import axios from "axios";

const CustomButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#25D366",
  color: "#ffffff",
  "&:hover": {
    backgroundColor: "#1DA851",
  },
  borderRadius: "20px",
  padding: "0.6rem",
  marginTop: "1rem",
}));

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    await axios.post("http://localhost:5000/api/user/login", { email, password})
      .then()
      .catch((error) => console.log(error))
  };

  return (
    <Box>
      <Typography variant="h5" align="center" color="textPrimary" gutterBottom>
        Login
      </Typography>
      <TextField
        fullWidth
        label="Email Address"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        sx={{ marginBottom: 2 }}
      />
      <TextField
        fullWidth
        label="Password"
        type={showPassword ? "text" : "password"}
        variant="outlined"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <CustomButton fullWidth onClick={handleLogin}>
        Login
      </CustomButton>
      <Button
        variant="text"
        fullWidth
        sx={{ marginTop: 2, color: "#128C7E" }}
      >
        Get Guest User Credentials
      </Button>
    </Box>
  );
};

export default Login;
