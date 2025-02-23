import React from "react";
import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  SimpleGrid,
  useColorModeValue,
  Icon,
  Stack,
  VStack,
  Button,
  Fade,
  Image,
} from "@chakra-ui/react";
import { FaBook, FaChalkboardTeacher, FaUserGraduate } from "react-icons/fa";
import { WEB_SITE_TITLE } from "../components/SidebarWithHeader";
import { useNavigate } from "react-router-dom";

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const cardBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const headingColor = useColorModeValue("gray.800", "white");
  const accentColor = useColorModeValue("secondary.500", "secondary.400");

  const features = [
    {
      icon: FaBook,
      title: "Assignment Tracking",
      description:
        "Keep track of submissions, deadlines, and student progress with our intuitive dashboard.",
    },
    {
      icon: FaUserGraduate,
      title: "Student Insights",
      description:
        "Gain valuable insights into each student's learning journey and adapt your teaching approach.",
    },
    {
      icon: FaChalkboardTeacher,
      title: "Classroom Management",
      description:
        "Seamlessly manage multiple classrooms and keep everything organized in one place.",
    },
  ];

  return (
    <Box bg={useColorModeValue("gray.50", "gray.900")}>
      {/* Hero Section */}
      <Container maxW="7xl" pt={{ base: 20, md: 28 }} pb={{ base: 16, md: 24 }}>
        <SimpleGrid
          columns={{ base: 1, md: 2 }}
          spacing={{ base: 10, md: 16 }}
          alignItems="center"
        >
          <VStack spacing={6} align={{ base: "center", md: "start" }} flex={1}>
            <Heading
              as="h1"
              size="2xl"
              lineHeight="shorter"
              color={headingColor}
              letterSpacing="tight"
            >
              Welcome to{" "}
              <Text as="span" color={accentColor}>
                {WEB_SITE_TITLE}
              </Text>
            </Heading>
            <Text fontSize="xl" color={textColor} lineHeight="tall">
              Simplify your teaching journey. Focus on what truly matters -
              inspiring your students.
            </Text>
            <Button
              size="lg"
              colorScheme="secondary"
              px={8}
              fontSize="md"
              height="14"
              onClick={() => window.open(process.env.REACT_APP_DASHBOARD_SITE_ADDRESS, '_blank')}
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: "lg",
              }}
            >
              Get Started
            </Button>
          </VStack>

          <Box flex={1} display="flex" justifyContent="center">
            <Image
              src="/dashboard.png"
              width="600px"
              height="400px"
              maxWidth="100%"
              borderRadius="2xl"
              position="relative"
              objectFit="contain"
              transition={"all 0.3s"}
              _hover = {{
                transform: "translateY(-6px)",
                boxShadow: "lg",
                scale: 1.05,
              }}
            />
          </Box>
        </SimpleGrid>
      </Container>

      {/* Features Section */}
      <Box
        py={{ base: 16, md: 24 }}
        bg={useColorModeValue("white", "gray.800")}
      >
        <Container maxW="7xl">
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
            {features.map((feature, index) => (
              <Fade in={true} delay={index * 0.2}>
                <Box
                  key={feature.title}
                  p={8}
                  bg={cardBg}
                  borderRadius="xl"
                  boxShadow="sm"
                  transition="all 0.3s"
                  _hover={{
                    transform: "translateY(-4px)",
                    boxShadow: "md",
                  }}
                >
                  <Icon
                    as={feature.icon}
                    w={8}
                    h={8}
                    color={accentColor}
                    mb={4}
                  />
                  <Heading size="md" mb={4} color={headingColor}>
                    {feature.title}
                  </Heading>
                  <Text color={textColor}>{feature.description}</Text>
                </Box>
              </Fade>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* Call to Action Section */}
      <Box py={{ base: 16, md: 20 }}>
        <Container maxW="4xl">
          <Box
            bg={useColorModeValue("secondary.50", "secondary.900")}
            p={{ base: 8, md: 12 }}
            borderRadius="2xl"
            textAlign="center"
            position="relative"
            overflow="hidden"
          >
            <VStack spacing={6}>
              <Heading size="xl" color={headingColor} letterSpacing="tight">
                Ready to Transform Your Classroom?
              </Heading>
              <Text fontSize="lg" color={textColor} maxW="2xl">
                Join thousands of educators who are revolutionizing their
                teaching experience with {WEB_SITE_TITLE}.
              </Text>
              <Button
                size="lg"
                colorScheme="secondary"
                px={8}
                fontSize="md"
                onClick={() => window.open(process.env.REACT_APP_DASHBOARD_SITE_ADDRESS, '_blank')}
                _hover={{
                  transform: "translateY(-2px)",
                  boxShadow: "lg",
                }}
              >
                Start Your Journey
              </Button>
            </VStack>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};
