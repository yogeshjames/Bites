import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import Checkbox from "./CheckBox";
import { useNavigate } from 'react-router-dom';
import CustomSpinner from  "./CustomSpinner";
import { useBreakpointValue } from '@chakra-ui/react';
import { IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import { Box, Typography, Tab, Tabs, TextField, Card, CardContent, CardMedia } from "@mui/material";
import PropTypes from "prop-types";
import Reviews from './Reviews'; // Import the ReviewComponent
import Loader from './Loader'; 
import { fontGrid } from "@mui/material/styles/cssUtils";
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
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  // Add to cart size
  const checkboxSize = useBreakpointValue({
    base: "43px",  // For mobile or smaller screens
    md: "30px",    // For medium screens and up
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/hotel/details/${hotelId}`
        );
        const hotelData = response.data.data;
        if (hotelData.dishes && hotelData.dishes.length > 0) {
          const foodResponse = await axios.post(
            "http://localhost:5000/api/food/details",
            { dishIds: hotelData.dishes }
          );
          hotelData.dishes = foodResponse.data.data;
        }

        setHotelDetails(hotelData);
      } catch (err) {
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

  const filteredDishes = hotelDetails?.dishes?.filter((dish) =>
    dish?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        <CustomSpinner />
      </Box>
    );

  if (error)
    return (
      <Typography color="error" sx={{ textAlign: "center", mt: 4 }}>
        {error}
      </Typography>
    );

  return (
    <Box>
      <Navbar />

      <Box sx={{ width: "100%", maxWidth: 800, mx: "auto", mt: 10 }}>
        {hotelDetails.thumbnailImage && (
          <Box sx={{ textAlign: "center", mb: 3, position: "relative" }}>
            <img
              src={`http://localhost:5000/${hotelDetails.thumbnailImage}`}
              alt="Hotel Thumbnail"
              style={{ width: "100%", borderRadius: 8, maxHeight: 400, objectFit: "cover" }}
            />
            <Box
              sx={{
                position: "absolute",
                bottom: { xs: "28vh", md: "60vh" }, // Adjust bottom position based on screen size
                right: { xs: "88vw", md: "60vw" }, // Adjust right position based on screen size
                zIndex: 0, // Ensure it appears above the content
              }}
            >
              <IconButton
                onClick={() => {
                  navigate(-1); // Go back to the previous page
                }}
                sx={{ color: "black" }}
              >
                <ArrowBackIcon sx={{ width: "40px" }} />
              </IconButton>
            </Box>
          </Box>
        )}

<Box display="flex" alignItems="flex-end"    justifyContent="center" sx={{ textAlign: 'center' }}>
<Typography
        variant="h4"
        gutterBottom
        sx={{
          fontWeight: "bold",
          paddingTop:'6px',
          fontFamily: "Nunito",
            position:"relative" ,top:'11px',
          marginRight: -1, // Space between loader and hotel name
 // Ensures the text itself is centered
        }}>
        {hotelDetails.hotelName}
        </Typography>
      <Loader />
    </Box>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ textAlign: "center", color: "gray" , paddingTop:'7px', fontFamily:"Nunito"} }
        >
          Rating: {hotelDetails.currentRating} ({hotelDetails.numberOfUsersRated} reviews)
        </Typography>

        <Box sx={{ borderBottom: 1, borderColor: "divider", mt: 4 }}>
        <Tabs
          value={value}
          onChange={handleTabChange}
          aria-label="hotel tabs"
          sx={{
            fontFamily: "'Poppins', sans-serif", // Apply custom font
            fontWeight: 600, // Make font weight bold
            fontSize: "18px", // Adjust font size
            letterSpacing: 0.5, // Optional: add letter spacing for clarity
          }}
        >
          <Tab
            label="Food Menu"
            {...a11yProps(0)}
            sx={{
              fontFamily: "'Poppins', sans-serif", // Apply custom font
              fontWeight: 600, // Bold text for this tab
              fontSize: "16px", // Slightly smaller font size for tab labels
              textTransform: "none", // Keep the text case as it is (no uppercase)
            }}
          />
          <Tab
            label="Reviews"
            {...a11yProps(1)}
            sx={{
              fontFamily: "'Poppins', sans-serif", // Apply custom font
              fontWeight: 600, // Bold text for this tab
              fontSize: "16px", // Slightly smaller font size for tab labels
              textTransform: "none", // Keep the text case as it is (no uppercase)
            }}
          />
        </Tabs>
      </Box>

        {/* Food Menu Tab */}
        <CustomTabPanel value={value} index={0}>
          <Box
            sx={{
              position: "relative",
              marginBottom: { xs: 2, md: 3 },
              marginTop: { xs: 2, md: 0 },
            }}
          >
            {/* Search Bar for small screens */}
            <TextField
              value={searchQuery}
              
              onChange={(e) => setSearchQuery(e.target.value)}
              variant="outlined"
              
              placeholder="Search dishes..."
              sx={{
                width: { xs: "100%", md: "250px" },
                // Full width for mobile, smaller width for larger screens
                position: { xs: "relative", md: "absolute" },
                right: { xs: 0, md: "20px" },
                borderRadius: "20px",
                "& .MuiOutlinedInput-root": {
      borderRadius: "20px", 
      fontFamily:"Muli",
      backgroundColor:'grey.100',
      height: "40px",// Apply rounding to the input field as well
    }, // Position at the right for larger screens
              }}
              InputProps={{
                endAdornment: (
                  <IconButton sx={{ padding: 0 }} onClick={() => {}}>
                    <SearchIcon />
                  </IconButton>
                ),
              }}
            />
          </Box>

          {filteredDishes && filteredDishes.length > 0 ? (
            <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: 3 }}>
              {filteredDishes.map((dish, index) => (
                <Card
                  key={index}
                  sx={{
                    display: "flex",
                    maxWidth: 400,
                    borderRadius: 2,
                    flexDirection: "row",
                    boxShadow: 3,
                  }}
                >
                  <CardContent sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1 }}>
                    <Typography gutterBottom variant="h6" component="div"  fontFamily="Muli" fontWeight={'bold'}>
                      {dish.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary"  fontFamily="Quicksand">
                      Price: ${dish.price}
                    </Typography>
                  </CardContent>

                  <Box sx={{ position: "relative", flex: 1 }}>
                    <Box 
                      sx={{
                        position: "absolute",
                        bottom: 10,
                        right: 10,
                        zIndex: 1,
                      }}
                    >
                      {/* The checkbox */}
                      <Checkbox size={checkboxSize} /> 
                    </Box>

                    <CardMedia
                      component="img"
                      height="200"
                      image={`http://localhost:5000/${dish.image}`}
                      alt={dish.name}
                      sx={{
                        objectFit: "cover",
                        borderRadius: 1,
                        flex: 1,
                        width: "100%",
                        height: "100%",
                      }}
                    />
                  </Box>
                </Card>
              ))}
            </Box>
          ) : (
            <Typography variant="body2" color="text.secondary">
              No dishes available.
            </Typography>
          )}
        </CustomTabPanel>

        {/* Reviews Tab - Render the ReviewComponent */}
        <CustomTabPanel value={value} index={1}>
          <Reviews hotelId={hotelId} />
        </CustomTabPanel>
      </Box>
    </Box>
  );
};

export default HotelDetails;
