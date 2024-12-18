import React, { useEffect, useState } from "react";
import axios from "axios";
import { VStack, Text, Skeleton, Box, SimpleGrid, Container } from "@chakra-ui/react";
import CardH from "./CardH";

const HotelsList = () => {
  const [hotels, setHotels] = useState([]); // State to store fetched hotels
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(null); // State for errors

  // Fetch hotels from the backend
  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/hotel/getall"); // API URL
        setHotels(response.data.data); // Set hotel data
      } catch (err) {
        console.error("Error fetching hotels:", err);
        setError("Failed to load hotels. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  return (
    <Container maxW="6xl" py={6}>
      {/* Error Message */}
      {error && (
        <Text color="red.500" fontSize="lg" textAlign="center" mb={4}>
          {error}
        </Text>
      )}

      {/* Skeleton Loading State */}
      {loading && (
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={6}>
          {[1, 2, 3, 4, 5, 6].map((index) => (
            <Box key={index} p={4} boxShadow="lg" borderRadius="md">
              <Skeleton height="150px" borderRadius="md" />
              <Skeleton mt="4" height="20px" width="50%" />
              <Skeleton mt="2" height="16px" width="70%" />
            </Box>
          ))}
        </SimpleGrid>
      )}

      {/* Hotels Grid */}
      {!loading && !error && (
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} >
          {hotels.map((hotel) => (
            <CardH
              key={hotel.hotelId}
              hotelId={hotel.hotelId}
              hotelName={hotel.hotelName}
              currentRating={hotel.currentRating}
              numberOfUsersRated={hotel.numberOfUsersRated}
              thumbnailImage={hotel.thumbnailImage}
              dishes={hotel.dishes}
            />
          ))}
        </SimpleGrid>
      )}
    </Container>
  );
};

export default HotelsList;
