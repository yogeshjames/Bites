import React, { useState } from 'react';
import { Box, Flex, Button, Text, Input, Link, Stack } from '@chakra-ui/react';
import { Checkbox } from './components/ui/checkbox'; // 
import { useNavigate } from 'react-router-dom';
import { PasswordInput } from './components/ui/password-input'; //
import { faTimes } from '@fortawesome/free-solid-svg-icons'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';

const Login = ({reset}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [mobile, setEmail] = useState('');
  const [password, setPassword] = useState('');
  //email is mobile

  const navigate = useNavigate();
  const handleSubmit = async () => {
    try {
      console.log(1);
      const response = await axios.post(`http://localhost:5000/api/user/login`, {
        mobile,
      password
    }, {
      withCredentials: true,  //  cookies are included
    });

      const { clientId } = response.data;

      localStorage.setItem('clientId', clientId);

//      toast.success('Login successful!');
    } catch (error) {
      console.error(error);
      if (error.response?.data?.message) {
  //      toast.error(error.response.data.message);
      } else {
    //    toast.error('Something went wrong. Please try again.');
      }
    }
  };

  return (
    <Flex
      direction="column"
      width="100%"
      height="100%"
      justify="center"
      align="center"
      
    >
      {/* Login  */}
      <Box
        bg="white"
        boxShadow="lg" borderRadius="lg"
        p={6} width="100%" 
        display="flex"
     flexDirection="column"
        justifyContent="center"
        alignItems="flex-start"
      >
        <Stack spacing={4} width="100%">
          <Box display={'flex'} position={'relative'}>
          <Text fontFamily="'Poppins', sans-serif" fontSize="3xl" fontWeight="bold" color="gray.800">
            Welcome Back!  </Text>
            <Button  textAlign={'center'}  position={'absolute'} top={{base:'-3vh' , md:'-6'}} left={{base:'43vw',md:'60'}} marginLeft={'11'}> <FontAwesomeIcon onClick={reset} size={'lg'}  icon={faTimes} /></Button>
            </Box>
          <Text fontFamily="'Poppins', sans-serif" fontSize="sm" color="gray.600" maxWidth="300px">  Log in now to explore all the features and benefits of our platform and see what’s new.
          </Text>

          
          <Stack spacing={4} width="100%">
            
            <Input
              placeholder="Enter your Mobile No."
              value={mobile}

   onChange={(e) => setEmail(e.target.value)}
              type="tel"
  variant="flushed"
              fontSize={'sm'}
  borderColor="teal.400"
      mb={6}
      minLength={'10'}
      maxLength={'10'}
              fontFamily="'Poppins', sans-serif"
     />

            <PasswordInput
            type={showPassword ? 'text' : 'password'}
        placeholder="Enter your password"
         value={password}
       onChange={(e) => setPassword(e.target.value)}
              variant="flushed"
           fontSize={'sm'}
        borderColor="teal.400"
              mb={6}
         fontFamily="'Poppins', sans-serif"
            />

            {/* Remember me and Forgot Password */}
            <Flex justify="space-between" width="100%" mb={4}>
             <Checkbox variant={'subtle'}>Remember my account</Checkbox>
          <Link href="#" color="blue.500" fontSize="sm">
                Forgot Password?
              </Link>
            </Flex>
           
            <Flex justify="space-between" width="100%">
      <Stack direction="column" spacing={2} mt={4} align="flex-start">
    <Text fontSize="sm" color="gray.600">
         Don't have an account?
       </Text>
                <Button variant="link" colorScheme="teal" fontSize="sm" >
           Register Now
        </Button>
              </Stack>

              <Button
                backgroundColor="#f08746"
            mt={4}
      py={6}
          fontWeight="bold"
        borderRadius="md"
                width="30%"
          maxWidth="150px" 
       display="flex"
                justifyContent="center"
                alignItems="center"
                onClick={handleSubmit}
        textAlign="center"
              >
      Login
   </Button>
 </Flex>
 </Stack>
        </Stack>
      </Box>
    </Flex>
  );
};

export default Login;
