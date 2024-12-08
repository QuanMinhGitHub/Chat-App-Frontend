import React, { useState } from "react";
import { Box, Tabs, Tab } from "@mui/material";
import { styled } from "@mui/system";
import Login from "../Components/Login";
import SignUp from "../Components/SignUp";

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: "#ECE5DD",
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
}));

const FormContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  maxWidth: "400px",
  backgroundColor: "#ffffff",
  borderRadius: "10px",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
  padding: "2rem"
}));

const HomePage = () => {
  const [activeTab, setActiveTab] = useState(0)

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <StyledBox>
      <FormContainer>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          centered
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab label="Login" />
          <Tab label="Sign Up" />
        </Tabs>
        <Box mt={2}>{activeTab === 0 ? <Login /> : <SignUp />}</Box>
      </FormContainer>
    </StyledBox>
  );
};

export default HomePage;
