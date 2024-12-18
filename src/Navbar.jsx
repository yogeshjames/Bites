import React, { useContext } from 'react';
import { Box, Flex, Button, Text, useBreakpointValue, IconButton } from '@chakra-ui/react';
import logo from './assets/logo.png';
import cartIcon from './assets/cart-icon.png';  // Replace with the actual path of the cart image
import  UserContext from './UserContext';  // Import UserContext
import Switch from './Switch';
const Navbar = ({ onSignInClick, onCartClick }) => { 
  // Use UserContext to check if the user is logged in
  const { user, setUser } = useContext(UserContext);  // Access user state and function to update it

  const sloganPosition = useBreakpointValue({ base: 'none', md: 'center' });
  // If you don't use flex="1" inside a Flex container, the Box or div will only occupy the size of its content, meaning it will take up just enough space to fit the children (like text or images)
  // inside it. It will not stretch to take up any additional space in the flex container.

  // flex=1 means it will take as much as available space
  // flexShrink=0 means the component won't shrink upon changing the size of other components. It will maintain its size 

  return (
    <Box bg="rgba(0,0,0 0.7)" position="fixed" height={'11vh'} backgroundColor={'white'} top="0" width="100%" zIndex="1">
      <Flex
        align="center"
        justify="space-between"
        padding="10px"
        maxW={{ base: '100%', sm: '80%', md: '1200px' }} mx="auto"
        wrap="wrap"
      >
        <Box textAlign="center" flexShrink="0"> 
          <img src={logo} alt="Logo" style={{ width: '75px' }} />
        </Box>
        <Box width={'10px'}>
               <Switch></Switch>
        </Box>
        <Box
          display={{ base: 'none', md: 'block' }}
          textAlign="center"
          margin="auto"
          flex="1"
          justifyContent="center"
          marginX="12"
          height={'7vh'}
        >
          <Text fontSize="l" fontWeight="bold" fontFamily={'Scandia'}>
            We got everything you love
            <span role="img" aria-label="heart">❤️</span>
          </Text>
        </Box>

        <Box flexShrink="0" height={'10vh'} paddingY={{ base: "3", md: "0" }}>
          {user ? (
            // If the user is logged in, show the cart icon
            <IconButton
              icon={<img src={cartIcon} alt="Cart" style={{ width: '30px', height: '30px' }} />}
              onClick={onCartClick} // Assuming onCartClick will handle the cart click action
              aria-label="Cart"
              variant="ghost"
              _hover={{ backgroundColor: 'transparent' }}
              size="lg"
            />
          ) : (
            // If the user is not logged in, show the Sign In button
            <Button
              onClick={onSignInClick}
              color="blue.700"
              border="1px solid"
              borderColor="blue.100"
              fontSize={{ base: "lg", md: "sm" }}
              paddingX="5"
              paddingY={{ base: "3", md: "2" }}
              fontWeight={{ base: "normal", md: "normal" }}
              borderRadius="full"
              _hover={{
                borderColor: 'blue.300',
              }}
            >
              Sign In
            </Button>
          )}
        </Box>
      </Flex>
    </Box>
  );
};

export default Navbar;
