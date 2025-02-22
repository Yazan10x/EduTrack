import { Box, Button, Heading, Text, useColorModeValue } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";

const PageNotFound: React.FC = () => {
  const location = useLocation(); // Get the current location
  const navigate = useNavigate(); // Get the navigate function

  const handleGoHome = () => {
    navigate("/"); // Navigate to the home page
  };

  const handleGoBack = () => {
    navigate(-1); // Navigate to the previous page
  };

  return (
      <Box
          display="flex"
          bg={useColorModeValue('white', 'gray.900')}
          justifyContent="center"
          alignItems="center"
          p="8"
          height="100vh"
      >
        <Box
            bg={useColorModeValue('white', 'gray.700')}
            p={8}
            color={useColorModeValue('black', 'white')}
            maxW="lg"
            borderRadius="md"
            textAlign="center"
            boxShadow="lg"
        >
          <Heading>
            <Text as="span" color="red.500" fontSize="50px">404</Text> Page not found
          </Heading>
          <Text mt={4} fontSize="lg">
            Sorry, the page <Text as="span" fontWeight="bold" color="teal.500">{location.pathname}</Text> does not exist.
          </Text>
          <Button onClick={handleGoBack} colorScheme="teal" mt={6} mr={4}>
            Go Back
          </Button>
          <Button onClick={handleGoHome} colorScheme="teal" mt={6}>
            Go Home
          </Button>
        </Box>
      </Box>
  );
};

export default PageNotFound;