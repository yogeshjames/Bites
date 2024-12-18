import React from "react";
import { Box, Text, Center } from "@chakra-ui/react";

const UnsupportedDevice = () => {
    
  return (
    <Center height="100vh" bg="gray.100">
      <Box textAlign="center" p={8} bg="white" boxShadow="lg" borderRadius="md">
        <Text fontSize="2xl" fontWeight="bold" color="red.500">
          Unsupported Device
        </Text>
        <Text mt={4} color="gray.600">
          This website is optimized for mobile phones and laptops only.  
          Please switch to a supported device for the best experience.
        </Text>
      </Box>
    </Center>
  );
};

export default UnsupportedDevice;
