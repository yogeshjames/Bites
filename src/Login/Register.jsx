"use client";

import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  Container,
  Paper,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';  // Import Toastify styles
//MAYBE INSTEAD OF TAKING FROM INPUT FIELD TAKE FROM PHONE.MAIL ITSELF
//SET UP ENV 
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.spacing(2),
  boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
  background: '#fdfcfb',
}));

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    password: '',
    rollno: '',
    hostel: '',
    room: '',
    mobile: '', // Added mobile number field
  });
  const [verifiedNumber, setVerifiedNumber] = useState('');
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    // Load the external script
    const script = document.createElement('script');
    script.src = 'https://www.phone.email/sign_in_button_v1.js';
    script.async = true;
    document.querySelector('.pe_signin_button').appendChild(script);

    // Define the listener function
    window.phoneEmailListener = function (userObj) {
      const user_json_url = userObj.user_json_url;

      // Fetch the verified phone number from the JSON URL
      axios.get(user_json_url).then((response) => {
        const { user_phone_number } = response.data;
        setVerifiedNumber(user_phone_number);
        toast.success('Phone verification successful!');
      });
    };

    return () => {
      window.phoneEmailListener = null; // Cleanup listener
    };
  }, []);

  const handleSubmit = async () => {
    if (!verifiedNumber) {
      toast.error('Please verify your phone number first!');
      return;
    }

    if (formData.mobile !== verifiedNumber) {
      toast.error('The phone number you entered does not match the verified number!');
      return;
    }

    try {
      await axios.post(`http://localhost:5000/api/user/register`, { ...formData, mobile: verifiedNumber });
      toast.success('Registration Successful!');
      navigate('/');
    } catch (error) {
      console.error(error);
      toast.error('Registration failed. Please try again.');
    }
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
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
              />
              <TextField
                fullWidth
                label="Mobile Number"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
              />
            </Grid>

            {/* Right Column */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Rollno."
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

          <Box className="pe_signin_button" data-client-id="13667769996153541401" mt={4} />

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mt: 4,
            }}
          >
            <Button
              onClick={handleSubmit}
              variant="contained"
              color="primary"
              size="large"
              disabled={!verifiedNumber}
            >
              Register
            </Button>
          </Box>
        </Box>
      </StyledPaper>

      {/* ToastContainer to show toasts */}
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </Container>
  );
}
