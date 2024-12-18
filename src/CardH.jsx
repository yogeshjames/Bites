import { Box, HStack, Image, Text } from "@chakra-ui/react";
import { useState } from "react";
import "./Heart.css"; 
import { useNavigate } from "react-router-dom";

const CardH = ({
  hotelId,
  hotelName,
  currentRating,
  numberOfUsersRated,
  thumbnailImage,
  dishes,
}) => {
  const [liked, setLiked] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/hotel/${hotelId}`);
  };

  const handleLikeClick = (event) => {
    //should not go to card
    event.stopPropagation();
    setLiked(!liked);
  };

  return (
    <Box
      border="1px solid #E2E8F0"
      borderRadius="lg"
      margin={{ md: '2vw' }}
      marginBottom={{ base: '1vh', md: '3vh' }}
      boxShadow="lg"
      overflow="hidden"
      display="flex"
      maxW="xl"
      position="relative"
      _hover={{
        boxShadow: "xl",
        transform: "translateY(-4px)",
        transition: "all 0.3s ease-in-out",
      }}
    >
      <Box position="relative">
        <Image
          objectFit="cover"
          maxW="150px" // adjust this for image size
          src={`http://localhost:5000/${thumbnailImage}`}
          alt={hotelName}
        />

        {/* Heart */}
        <label
          className="ui-bookmark"
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            zIndex: "10",
          }}
        >
          <input
            type="checkbox"
            checked={liked}
            onChange={handleLikeClick} // Use the custom handler here
          />
          <div className="bookmark">
            <svg
              viewBox="0 0 16 16"
              style={{ marginTop: "4px" }}
              className="bi bi-heart-fill"
              height="25"
              width="25"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"
                fillRule="evenodd"
              ></path>
            </svg>
          </div>
        </label>
      </Box>

      <Box p={4} flex="1"   onClick={handleClick} cursor={'pointer'}>
        <HStack justifyContent="space-between" alignItems="flex-start">
          <Text fontSize="lg" fontWeight="bold" color="gray.800">
            {hotelName}
          </Text>
        </HStack>

        <Text fontSize="sm" color="gray.500" mt="1">
          Rating: {currentRating} ⭐ ({numberOfUsersRated} users)
        </Text>

        <Text mt="2" color="gray.600" fontSize="sm">
          Popular Dishes: {dishes.join(", ")}
        </Text>
      </Box>
    </Box>
  );
};

export default CardH;
