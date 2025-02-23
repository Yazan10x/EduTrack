import React from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  useColorModeValue,
  Container,
  Button,
  Image,
} from "@chakra-ui/react";

// We no longer import { keyframes } from '@chakra-ui/react'.

const Mission: React.FC = () => {
  // Reference the custom keyframe animation by name
  const floatAnimation = "float 4s ease-in-out infinite";
  const gradientText = useColorModeValue(
    "linear(to-r, secondary.500, secondary.700)",
    "linear(to-r, secondary.400, secondary.600)"
  );

  return (
    <>
      {/* Define the @keyframes in a <style> block */}
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0); }
          }
        `}
      </style>

      <Heading
          as="h1"
          size="2xl"
          mb={6}
          bgGradient={gradientText}
          bgClip="text"
          textAlign={"center"}
            py={12}
        >
          Our Mission
        </Heading>

      <Box
        bg={"white.50"}
        color="text"
        position="relative"
        overflow="hidden"
      >
        
        {/* Background Gradients */}
        <Box
          position="absolute"
          top="0"
          left="0"
          w="100%"
          h="100%"
          zIndex={0}
          bgGradient={useColorModeValue(
            "radial(circle at top left, secondary.50, transparent), radial(circle at bottom right, primary.50, transparent)",
            "radial(circle at top left, gray.800, transparent), radial(circle at bottom right, gray.900, transparent)"
          )}
        />
        <Box
          position="absolute"
          top="0"
          left="0"
          w="100%"
          h="100%"
          zIndex={0}
          bgGradient={useColorModeValue(
            "linear(to-b, primary.50, transparent)",
            "linear(to-b, gray.700, transparent)"
          )}
          opacity={0.5}
        />

        <Container maxW="7xl" py={12} position="relative" zIndex={1}>
          <Flex
            direction={{ base: "column", md: "row" }}
            align="center"
            gap={8}
          >
            <Box flex={1} animation={floatAnimation}>
              <Image
                src="/empty_classroom.png"
                alt="Teacher Shortage"
                borderRadius="lg"
                boxShadow="lg"
              />
            </Box>
            {/* Text */}
            <Box flex={1}>
              <Heading
                size="xl"
                mb={4}
                bgGradient="linear(to-r, secondary.400, primary.500)"
                bgClip="text"
              >
                The Teacher Shortage Crisis
              </Heading>
              <Text
                fontSize="lg"
                color={useColorModeValue("gray.600", "gray.300")}
              >
                Growing up in Canada, we experienced firsthand the impact of the
                teacher shortage. There were weeks when our classes had no
                teachers, leaving students without guidance and falling behind.
                We saw how overworked and stressed our teachers were, trying to
                manage large classes with limited resources.
              </Text>
            </Box>
          </Flex>
        </Container>

        {/* Section 2: Visual Right, Text Left */}
        <Container maxW="7xl" py={12} position="relative" zIndex={1}>
          <Flex
            direction={{ base: "column", md: "row-reverse" }}
            align="center"
            gap={8}
          >
            {/* Visual */}
            <Box flex={1} animation={floatAnimation}>
              <Image
                src="/stressed_teacher.png"
                alt="Overworked Teachers"
                borderRadius="lg"
                boxShadow="lg"
              />
            </Box>
            {/* Text */}
            <Box flex={1}>
              <Heading
                size="xl"
                mb={4}
                bgGradient="linear(to-r, secondary.400, primary.500)"
                bgClip="text"
              >
                Overworked and Overwhelmed
              </Heading>
              <Text
                fontSize="lg"
                color={useColorModeValue("gray.600", "gray.300")}
              >
                Our teachers were heroes, but even heroes have limits. They
                struggled to keep up with grading, lesson planning, and
                supporting students—all while managing overcrowded classrooms.
                We knew there had to be a better way to support them.
              </Text>
            </Box>
          </Flex>
        </Container>

        <Container maxW="7xl" py={12} position="relative" zIndex={1}>
          <Flex
            direction={{ base: "column", md: "row" }}
            align="center"
            gap={8}
          >
            <Box flex={1} animation={floatAnimation}>
              <Image
                src="/full_logo.png"
                alt="EduTrack Solution"
                borderRadius="lg"
                boxShadow="lg"
                h="50vh"
              />
            </Box>
            <Box flex={1}>
              <Heading
                size="xl"
                mb={4}
                bgGradient="linear(to-r, secondary.400, primary.500)"
                bgClip="text"
              >
                Why We Created EduTrack
              </Heading>
              <Text
                fontSize="lg"
                color={useColorModeValue("gray.600", "gray.300")}
              >
                EduTrack was born out of a desire to make teachers' lives
                easier. By simplifying assignment tracking, providing student
                insights, and automating repetitive tasks, we aim to give
                teachers more time to focus on what they do best: teaching. Our
                mission is to empower teachers and ensure no student gets left
                behind.
              </Text>
            </Box>
          </Flex>
        </Container>

        {/* Call-to-Action Section */}
        <Box
          mt={12}
          py={12}
          bgGradient={useColorModeValue(
            "linear(to-r, secondary.50, secondary.100)",
            "linear(to-r, gray.800, gray.900)"
          )}
          position="relative"
          overflow="hidden"
        >
          {/* Animated background shapes */}
          <Box
            position="absolute"
            top="-50%"
            left="-10%"
            w="120%"
            h="200%"
            bg="rgba(255, 255, 255, 0.1)"
            transform="rotate(45deg)"
            zIndex={0}
          />
          <Box
            position="absolute"
            top="-30%"
            right="-10%"
            w="100%"
            h="200%"
            bg="rgba(255, 255, 255, 0.05)"
            transform="rotate(-30deg)"
            zIndex={0}
          />

          <Container
            maxW="md"
            textAlign="center"
            position="relative"
            zIndex={1}
          >
            <Heading
              size="lg"
              mb={4}
              bgGradient="linear(to-r, secondary.400, primary.500)"
              bgClip="text"
            >
              Join Us in Empowering Teachers
            </Heading>
            <Text
              fontSize="lg"
              mb={6}
              color={useColorModeValue("gray.600", "gray.300")}
            >
              Together, we can make a difference in education. Let's give
              teachers the tools they need to thrive and ensure every student
              has the opportunity to succeed.
            </Text>
            <Button
              colorScheme="secondary"
              size="lg"
              onClick={() =>
                window.open(
                  process.env.REACT_APP_DASHBOARD_SITE_ADDRESS,
                  "_blank"
                )
              }
            >
              Get Started Now
            </Button>
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default Mission;
