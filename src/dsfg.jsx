'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Container,
  Paper,
  InputAdornment,
} from '@mui/material';
import { styled } from '@mui/material/styles';

// Styled components for elegance
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.spacing(2),
  boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
  background: '#fdfcfb',
}));

const StyledButton = styled(Button)(({ theme }) => ({
  fontWeight: 'bold',
  textTransform: 'none',
  borderRadius: theme.spacing(1),
  padding: theme.spacing(1.5),
}));

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    password: '',
    rollno: '',
    hostel: '',
    room: '',
  });

  useEffect(() => {
    // Load the external script
    const script = document.createElement('script');
    script.src = 'https://www.phone.email/sign_in_button_v1.js';
    script.async = true;
    document.querySelector('.pe_signin_button').appendChild(script);

    // Define the listener function
    window.phoneEmailListener = function (userObj) {
      const user_json_url = userObj.user_json_url;

      // Debug message for now (remove later)
      document
        .querySelector('.pe_signin_button')
        .insertAdjacentHTML(
          'beforeend',
          `<span>Phone Verification Successful!<br />Read the following user_json_url from the backend to get the verified phone number: ${user_json_url}</span>`
        );

      // Optional: Use `fetch` to send the URL to your backend if needed
    };

    return () => {
      // Cleanup the listener function when the component unmounts
      window.phoneEmailListener = null;
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    // alert('Registration Successful!');
  };

  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <StyledPaper elevation={3}>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ fontFamily: 'Roboto, sans-serif', fontWeight: 500, color: '#333' }}
        >
          Register
        </Typography>

        <Box component="form" noValidate>
          <Grid container spacing={4}>
            {/* Left Column */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
              />
              <TextField
                fullWidth
                label="Mobile Number"
                name="mobile"
                type="tel"
                value={formData.mobile}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
                inputProps={{ maxLength: 10 }}
                InputProps={{
                  startAdornment: <InputAdornment position="start">+91</InputAdornment>,
                }}
              />
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
              />
            </Grid>

            {/* Right Column */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Roll No."
                name="rollno"
                value={formData.rollno}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
              />
              <TextField
                fullWidth
                label="Hostel Name"
                name="hostel"
                value={formData.hostel}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
              />
              <TextField
                fullWidth
                label="Room Number"
                name="room"
                value={formData.room}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
              />
            </Grid>
          </Grid>

          {/* Phone Verification Button */}
          <Box
            className="pe_signin_button"
            data-client-id="13667769996153541401"
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mt: 4,
            }}
          ></Box>

          {/* Register Button */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mt: 4,
            }}
          >
            <StyledButton
              onClick={handleSubmit}
              variant="contained"
              color="primary"
              size="large"
            >
              Register
            </StyledButton>
          </Box>
        </Box>
      </StyledPaper>
    </Container>
  );
}
