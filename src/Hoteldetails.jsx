import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
//import CardF from "CardF";
import {
  Box,
  Typography,
  Tab,
  Tabs,
  CircularProgress,
} from "@mui/material";
import PropTypes from "prop-types";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const HotelDetails = () => {
  const { hotelId } = useParams();
  const [hotelDetails, setHotelDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [value, setValue] = useState(0); // State for active tab

  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        // Fetch hotel details
        const response = await axios.get(
          `http://localhost:5000/api/hotel/details/${hotelId}`
        );
        setHotelDetails(response.data.data);
       
        // Fetch food details using dishes array
        if (response.data.data.dishes && response.data.data.dishes.length > 0) {
          const foodResponse = await axios.post(
            "http://localhost:5000/api/food/details",
            { dishIds: response.data.data.dishes }
          );
          console.log("Fetched Food Details:", foodResponse.data);
        } else {
          console.log("No dishes available for this hotel.");
        }
      } catch (err) {
        console.error("Error fetching hotel details:", err);
        setError("Failed to load hotel details.");
      } finally {
        setLoading(false);
      }
    };

    fetchHotelDetails();
  }, [hotelId]);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  if (loading)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );

  if (error)
    return (
      <Typography color="error" sx={{ textAlign: "center", mt: 4 }}>
        {error}
      </Typography>
    );

  return (
    <Box sx={{ width: "100%", maxWidth: 800, mx: "auto", mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        {hotelDetails.hotelName}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Rating: {hotelDetails.currentRating} ({hotelDetails.numberOfUsersRated} reviews)
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: "divider", mt: 2 }}>
        <Tabs value={value} onChange={handleTabChange} aria-label="hotel tabs">
          <Tab label="Food Menu" {...a11yProps(0)} />
          <Tab label="Reviews" {...a11yProps(1)} />
        </Tabs>
      </Box>

      {/* Food Menu Tab */}
      <CustomTabPanel value={value} index={0}>
        {hotelDetails.dishes && hotelDetails.dishes.length > 0 ? (
          hotelDetails.dishes.map((dish, index) => (
            <Box
              key={index}
              sx={{
                mb: 2,
                p: 2,
                border: "1px solid #ddd",
                borderRadius: 2,
              }}
            >
              <Typography variant="h6">{dish.name}</Typography>
              <Typography>Price: ${dish.price}</Typography>
            </Box>
          ))
        ) : (
          <Typography>No menu available.</Typography>
        )}
      </CustomTabPanel>

      {/* Reviews Tab */}
      <CustomTabPanel value={value} index={1}>
        {hotelDetails.reviews && hotelDetails.reviews.length > 0 ? (
          hotelDetails.reviews.map((review, index) => (
            <Box
              key={index}
              sx={{ mb: 2, p: 2, bgcolor: "#f9f9f9", borderRadius: 2 }}
            >
              <Typography variant="subtitle1" fontWeight="bold">
                {review.user}
              </Typography>
              <Typography>{review.comment}</Typography>
              <Typography color="textSecondary">Rating: {review.rating}</Typography>
            </Box>
          ))
        ) : (
          <Typography>No reviews available.</Typography>
        )}
      </CustomTabPanel>
      <CardF></CardF>
    </Box>
  );
};

export default HotelDetails;
