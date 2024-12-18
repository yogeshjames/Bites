import {React,useState, useEffect} from 'react';
import { Box, Flex, Button, Text, useBreakpointValue ,  useDisclosure,  Input ,} from '@chakra-ui/react';
import bg from './assets/largebg.jpg';
import sm from './assets/smallbg.jpg'
import third from "./assets/3rd.svg";
import second from "./assets/2nd.png"
import first from "./assets/1st.svg";
import eating from "./assets/eating.jpg"
import Login from "./Login"
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
///// THE SPACE BETWEEN DIALOGE BOX AND LOGIN FIELD NEED TO BE REDUCED AND THAT SCROLLING SHOULD BE STOPPED
//SIGN IN BUTTONS WORKS alternative timeds only
const Home = ({ onOpenDialog }) => {
  const [isOpen, setIsOpen] = useState(false);
  const openDialog = () => setIsOpen(true);
  const closeDialog = () => {setIsOpen(false);
    console.log('2323');
  } 
    const backgroundImage = useBreakpointValue({ base: sm, md: bg });
    useEffect(() => {
      if (onOpenDialog) {
        openDialog();
        console.log('e3e') // This function opens the dialog if onOpenDialog is true
      }
    }, [onOpenDialog]);
  
  return (
    <Flex
      align="center"
      paddingY="16"
      maxW={{ base: '100%', sm: '80%', md: '1200px' }}
      mx="auto"
      wrap="wrap"
    >
      <Box position="relative" width="100%" height="40%">
        <img src={backgroundImage} alt="Background" width="100%" height="100%" />

        <Box
          display="block"
          position="absolute"
          top={{base:"15vh" ,md:"25vh"}}
          left={{base:"-15vw" ,md:"45vw"}}
          textAlign="center"
          maxWidth="90%" 
        >
          <Text
            fontSize={{base:"3xl" ,md:"4xl"}}
            fontWeight="bold"
            color="white"
            fontFamily="Poppins"
             wordBreak="break-word"
            padding={{base:"12",md:"7"}}
          >
            Get your food delivered.
          </Text>
          <Button  onClick={openDialog}
            borderRadius="full"
            color="white"
            backgroundColor="#c26608" 
            paddingX={{base:"3",md:"7"}}
            fontSize={{base:"lg",md:"lg"}} 
            fontWeight={'bold'}
            fontFamily={'Lira'}
            
            _hover={{
              backgroundColor: '#d79d18', 
            }}
            textAlign="center" 
          >
            Register Now
          </Button>
        </Box>
      </Box>
      <Box 
  display="flex" 
  justifyContent="center" 
  alignItems="center" 
  marginY="4.5"
  width="100%"
>
  <Text textAlign="center" fontWeight="extrabold" fontSize={{base:"2xl", md:"4xl"}} fontFamily="Robota">
    Why you'll love us:
  </Text>
</Box>
<Flex justify="space-between" wrap="wrap" width="100%" paddingTop={'5vh'}>
        {/* Block 1 */}
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          width={{ base: '100%', md: '30%' }}
          marginBottom="8"
        >
          <Box width="96px" height="96px" mb="4">
            <img src={first} alt="Satisfy any craving" width="100%" height="100%" />
          </Box>
          <Text fontSize="xl" fontWeight="bold" mb="2" textAlign="center">
            Satisfy any craving
          </Text>
          <Text textAlign="center" color="gray.500">
            Check out menus from popular local restaurants and chains. Order something new or tuck into your favorite go-to.
          </Text>
        </Box>

        {/* Block 2 */}
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          width={{ base: '100%', md: '30%' }}
          marginBottom="8"
        >
          <Box width="96px" height="96px" mb="4">
            <img src={second} alt="Delivery or pickup" width="100%" height="100%" />
          </Box>
          <Text fontSize="xl" fontWeight="bold" mb="2" textAlign="center">
            Delivery or pickup
          </Text>
          <Text textAlign="center" color="gray.500">
            Sit back and relax, have us deliver to you or skip the line with pickup.
          </Text>
        </Box>

        {/* Block 3 */}
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          width={{ base: '100%', md: '30%' }}
          marginBottom="8"
        >
          <Box width="96px" height="96px" mb="4">
            <img src={third} alt="Save with FoodApp+" width="100%" height="100%" />
          </Box>
          <Text fontSize="xl" fontWeight="bold" mb="2" textAlign="center">
            Save with Bites+
          </Text>
          <Text textAlign="center" color="gray.500">
            Join Bites+ and get unlimited $0 delivery fees, exclusive offers, and more.
          </Text>
        </Box>
      </Flex>

      {/* FOOTER NEED TO BE ADDED AFTER ABOUT US
      
      //changed felx direction based on the device soo it comes column wise or row wise*/}
      <Flex wrap="wrap" flexDirection={{base:'column',md:'row'}} alignItems="center" marginTop="10" width="100%">
        <Box flex="1" padding="4" >
          <Text fontSize={{ base: 'xl', md: '3xl' }} font fontFamily={'poppins'} fontWeight="bold" mb="4">
            A place where friends and food come together.
          </Text>
          <Text color="gray.600" fontSize={{ base: 'sm', md: 'sm' }}>
            Hungry after a long day of classes? Grab your friends and explore our delicious range of meals. Whether it’s late-night cravings or a weekend feast, we’ve got you covered. Order with ease, and enjoy every bite with your favorite group of pals.
          </Text>
        </Box>
        <Box flex="1" padding="4"  width='100%'  flexDirection={{ base: 'column', md: 'row' }}  textAlign="center" display={{base:'flex',md:'flex'}}>
          <img src={eating} alt="Friends enjoying food together" style={{ maxWidth: '100%', borderRadius: '8px' }} />
        </Box>
      </Flex>

      {/*about us*/}

      <Box display={{base:'block' ,md:'flex'}} paddingBottom="5vh"  flexDirection={{ base: 'column', md: 'row' }}  width={'100vw'} backgroundColor={'#efefef'} mt={'5vh'}>
<Box  display="flex"  flex={'1'} justifyContent={'center'} alignItems={'center'}>
  <Text textAlign={'center'} fontFamily={'Montserrat'} fontSize={'3xl'} fontWeight={'extrabold'}>
    About us</Text></Box>
    <Box display={'flex'} flex={'1'} justifyContent={'center'} alignItems={'center'}>
  <Text textAlign={'center'}  paddingY="4"  width='100%' color="gray.600" fontSize={'sm'} >
  We’re a small group of passionate individuals from NIT Trichy, driven by a shared vision to make a difference. What started as a spark of curiosity has grown into a mission to create meaningful change. From late-night brainstorming sessions to turning ideas into impactful actions, we believe in building solutions that truly matter.

Whether it's simplifying student queries, empowering institutions, or just adding a little extra flavor to everyday challenges, we’re here to bring innovation to life. Fueled by chai, camaraderie, and a can-do attitude, we’re on a journey to leave a lasting impact—one project at a time.

Join us as we turn “blehh blehh” into something extraordinary. 🚀</Text></Box>

      </Box>
{/*DIALOGE PART */}

<Dialog
        open={isOpen}  // The `Dialog` component is controlled by the `open` state
        onClose={closeDialog}  // Close the dialog when the backdrop is clicked
        aria-describedby="alert-dialog-slide-description"
         maxWidth="sm"
        
      >

<DialogContent>
          
          
      
              <Login reset={closeDialog}></Login>
         
        </DialogContent>

        
      </Dialog>
    </Flex>
  );
};

export default Home;
