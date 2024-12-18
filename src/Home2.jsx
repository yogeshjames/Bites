import React from 'react';
import one from './assets/one.jpg';
import three from './assets/three.jpg';
import two from './assets/two.jpg';
import Navbar from './Navbar';
import Carousel from 'react-material-ui-carousel';
import { Box, useBreakpointValue ,Flex, Button, Text, Input, Link, Stack } from '@chakra-ui/react';
import HotelsList from './HotelsList';

const Home2 = () => {
    const items = [one, two, three];

    // Dynamically set height based on screen size
    const carouselHeight = useBreakpointValue({
        base: '40vh', // Height for small screens (e.g., mobile)
        md: '70vh',   // Height for medium and larger screens
    });

    function Item(props) {
        return (
            <Box
                as="img"
                src={props.item}
                alt="carousel-item"
                width="100%"
                height={carouselHeight}
                objectFit="cover"
            />
        );
    }

    return (
        <Box>
            {/* Fixed Navbar */}
            <Box position="fixed" width="100%" zIndex="1000">
                <Navbar />
            </Box>

            {/* Content with proper margin for the navbar */}
            <Box marginTop="12vh">
                <Carousel>
                    {items.map((item, i) => (
                        <Item key={i} item={item} />
                    ))}
                </Carousel>
            </Box>
            <Text width ='100%' fontWeight={'bold'} fontSize={{base:'xl',md:'3xl'}} paddingTop={'20px'} fontFamily={'Quicksand'} 
            textAlign='center'>Where would you u like to order from😊 </Text>
<HotelsList></HotelsList>
            
        </Box>
    );
};

export default Home2;
