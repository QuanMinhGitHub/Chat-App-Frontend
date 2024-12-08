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

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSignUp = async () => {
    if (!profilePicture) {
      alert("Please upload a profile picture!");
      return;
    }

    const formData = new FormData();
    formData.append("profilePicture", profilePicture);

    try {
      const imageUploadResponse = await axios.post('http://localhost:5000/api/user/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log("Image Upload Response:", imageUploadResponse);

      const { imageUrl } = imageUploadResponse.data; 

      const userData = {
        name,
        email,
        password,
        pic: imageUrl, 
      };

      const userRegistrationResponse = await axios.post('http://localhost:5000/api/user', userData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('User registered successfully:', userRegistrationResponse.data);

    } catch (error) {
      if (error.response) {
        console.error('Error Response:', error.response.data);
        alert(`Error: ${error.response.data.message || error.response.statusText}`);
      } else if (error.request) {
        console.error('Error Request:', error.request);
        alert('No response from the server. Please try again later.');
      } else {
        console.error('Error:', error.message);
        alert('An error occurred while setting up the request.');
      }
    }
  };

  return (
    <Box>
      <Typography variant="h5" align="center" color="textPrimary" gutterBottom>
        Sign Up
      </Typography>
      <TextField
        fullWidth
        label="Name"
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
        sx={{ marginBottom: 2 }}
      />
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
        sx={{ marginBottom: 2 }}
      />
      <TextField
        fullWidth
        label="Confirm Password"
        type={showConfirmPassword ? "text" : "password"}
        variant="outlined"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{ marginBottom: 2 }}
      />
      <Button
        variant="outlined"
        component="label"
        fullWidth
        sx={{ marginBottom: 2 }}
      >
        Upload your Picture
        <input
          type="file"
          hidden
          accept="image/*"
          onChange={(e) => setProfilePicture(e.target.files[0])}
        />
      </Button>
      <CustomButton fullWidth onClick={handleSignUp}>
        Sign Up
      </CustomButton>
    </Box>
  );
};

export default SignUp;
