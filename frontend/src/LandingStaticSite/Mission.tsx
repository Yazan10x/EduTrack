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
  VStack,
  HStack,
  Icon,
  Divider,
} from "@chakra-ui/react";
import { FaQuoteLeft, FaArrowRight, FaHeart, FaLightbulb, FaUsers } from "react-icons/fa";

interface StorySectionProps {
    title: string;
    description: string;
    imageSrc: string;
    imageAlt: string;
    isReversed?: boolean;
    icon: any;
    imageHeight?: string;
    }

const StorySection: React.FC<StorySectionProps> = ({ title, description, imageSrc, imageAlt, isReversed = false, icon, imageHeight = "400px" }) => {
  const floatAnimation = "float 4s ease-in-out infinite";
  
  return (
    <Container maxW="7xl" py={16} position="relative">
      <Flex
        direction={{ base: "column", lg: isReversed ? "row-reverse" : "row" }}
        align="center"
        gap={{ base: 8, lg: 16 }}
      >
        <Box flex={1} position="relative">
          {/* Background shape with hover animation */}
          <Box
            position="absolute"
            top="-20px"
            left="-20px"
            bg="secondary.50"
            w="full"
            h="full"
            rounded="2xl"
            transform="rotate(-3deg)"
            transition="all 0.3s ease-in-out"
            zIndex={0}
            _groupHover={{
              transform: "rotate(0deg)",
              bg: "secondary.100",
            }}
          />
          {/* Second background shape for layered effect */}
          <Box
            position="absolute"
            top="-10px"
            left="-10px"
            bg="primary.50"
            w="full"
            h="full"
            rounded="2xl"
            transform="rotate(-1.5deg)"
            transition="all 0.3s ease-in-out"
            zIndex={0}
            _groupHover={{
              transform: "rotate(-4.5deg)",
              bg: "primary.100",
            }}
          />
          {/* Image container with hover effect */}
          <Box 
            position="relative" 
            animation={floatAnimation}
            role="group"
            transition="all 0.3s ease-in-out"
            _hover={{ transform: "scale(1.02)" }}
          >
            <Image
              src={imageSrc}
              alt={imageAlt}
              borderRadius="xl"
              boxShadow="2xl"
              w="full"
              objectFit="cover"
              h={{ base: "300px", md: imageHeight }}
              transition="all 0.3s ease-in-out"
              _groupHover={{
                boxShadow: "3xl",
              }}
            />
          </Box>
        </Box>
        
        <VStack flex={1} align="start" spacing={6}>
          <HStack color="secondary.500" spacing={4}>
            <Icon as={icon} boxSize={6} />
            <Heading
              size="lg"
              bgGradient="linear(to-r, secondary.500, secondary.700)"
              bgClip="text"
            >
              {title}
            </Heading>
          </HStack>
          <Text
            fontSize="lg"
            color={useColorModeValue("gray.600", "gray.300")}
            lineHeight="tall"
          >
            {description}
          </Text>
        </VStack>
      </Flex>
    </Container>
  );
};

const Mission = () => {
  const gradientBg = useColorModeValue(
    "linear(to-b, white, secondary.50, white)",
    "linear(to-b, gray.900, gray.800, gray.900)"
  );

  return (
    <>
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0); }
          }
        `}
      </style>

      <Box bgGradient={gradientBg}>
        {/* Hero Section */}
        <Container maxW="4xl" pt={20} pb={16} textAlign="center">
          <Icon as={FaQuoteLeft} boxSize={8} color="secondary.500" mb={6} />
          <Heading
            as="h1"
            size="2xl"
            mb={6}
            bgGradient="linear(to-r, secondary.500, secondary.700)"
            bgClip="text"
            lineHeight="shorter"
          >
            Empowering Teachers to Create Brighter Futures
          </Heading>
          <Text
            fontSize="xl"
            color={useColorModeValue("gray.600", "gray.300")}
            maxW="2xl"
            mx="auto"
          >
            Our journey began with a simple observation: teachers needed better tools to do what they do best—inspire and educate the next generation.
          </Text>
          <Divider my={12} borderColor="secondary.100" />
        </Container>

        {/* Story Sections */}
        <StorySection
          title="The Teacher Shortage Crisis"
          description="Growing up in Canada, we experienced firsthand the impact of the teacher shortage. There were weeks when our classes had no teachers, leaving students without guidance and falling behind. We saw how overworked and stressed our teachers were, trying to manage large classes with limited resources."
          imageSrc="/empty_classroom.png"
          imageAlt="Empty Classroom"
          icon={FaUsers}
        />

        <StorySection
          title="Overworked and Overwhelmed"
          description="Our teachers were heroes, but even heroes have limits. They struggled to keep up with grading, lesson planning, and supporting students—all while managing overcrowded classrooms. We knew there had to be a better way to support them."
          imageSrc="/stressed_teacher.png"
          imageAlt="Overworked Teachers"
          isReversed
          icon={FaHeart}
        />

        <StorySection
          title="Why We Created EduTrack"
          description="EduTrack was born out of a desire to make teachers' lives easier. By simplifying assignment tracking, providing student insights, and automating repetitive tasks, we aim to give teachers more time to focus on what they do best: teaching. Our mission is to empower teachers and ensure no student gets left behind."
          imageSrc="/full_logo.png"
          imageAlt="EduTrack Solution"
          icon={FaLightbulb}
          imageHeight="300px"  // Adjusted height for logo
        />

        {/* Call-to-Action */}
        <Box
          bg={useColorModeValue("secondary.500", "secondary.600")}
          color="white"
          py={16}
          position="relative"
          overflow="hidden"
        >
          <Box
            position="absolute"
            top="0"
            left="0"
            w="full"
            h="full"
            bgGradient="linear(to-r, secondary.600, secondary.700)"
            opacity={0.8}
          />
          
          <Container maxW="3xl" position="relative" textAlign="center">
            <VStack spacing={8}>
              <Heading size="xl">Join Us in Empowering Teachers</Heading>
              <Text fontSize="lg" opacity={0.9}>
                Together, we can make a difference in education. Let's give teachers the tools they need to thrive and ensure every student has the opportunity to succeed.
              </Text>
              <Button
                size="lg"
                rightIcon={<FaArrowRight />}
                bg="white"
                color="secondary.500"
                _hover={{ bg: "gray.100" }}
                px={8}
                onClick={() => window.open(process.env.REACT_APP_DASHBOARD_SITE_ADDRESS, '_blank')}
              >
                Get Started Now
              </Button>
            </VStack>
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default Mission;