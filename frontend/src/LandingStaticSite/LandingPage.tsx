import React from 'react';
import {
    Box,
    Flex,
    Heading,
    Text,
    SimpleGrid,
    useColorModeValue,
    Container,
    Icon, Stack, Spacer,
} from '@chakra-ui/react';
import Button from '../ui/button/Button';
import { CheckCircleIcon } from '@chakra-ui/icons';
import { FaBook, FaChalkboardTeacher, FaUserGraduate, FaLightbulb, FaAward, FaLaptopCode } from 'react-icons/fa';
import { WEB_SITE_TITLE } from "../components/SidebarWithHeader";

// Example card style with hover effect
const cardStyle = {
    p: 6,
    bg: 'gray.50',
    rounded: 'lg',
    shadow: 'md',
    transition: 'transform 0.3s ease',
    _hover: {
        transform: 'translateY(-5px)',
        shadow: 'lg',
    },
}

export const LandingPage: React.FC = () => {
    // A simple card style for repeated use
    const cardStyle = {
        p: 6,
        textAlign: 'center' as const,
        bg: useColorModeValue('white', 'gray.800'),
        borderRadius: 'lg',
        boxShadow: 'lg',
        transition: 'all 0.3s ease',
        _hover: {
            transform: 'translateY(-6px)',
            boxShadow: 'xl',
        },
    };

    // Hero illustration (keeping the same image, but the layout changes)
    const heroImage = useColorModeValue(
        "url('/logo1.png')",
        "url('/logo1.png')"
    );

    return (
        <Box bg={'white.50'} color="text">
            {/*
        Hero Section
        - Uses a wave-style top layer plus reversed layout (image left, text right).
      */}
            <Box h="300px" position="relative" overflow="hidden">
                {/* Wave Background */}
                <Box
                    position="absolute"
                    top="0"
                    left="0"
                    right="0"
                    h="100px"
                    bg={useColorModeValue('secondary.200', 'secondary.700')}
                    zIndex={-1}
                    clipPath="polygon(0 0, 100% 0, 100% 75%, 0 100%)"
                />
                <Spacer h={"15px"}/>

                <Container maxW="7xl" py={{ base: 12, md: 20 }} px={8}>
                    <Flex
                        direction={{ base: 'column', md: 'row-reverse' }}
                        align="center"
                        justify="space-between"
                        gap={8}
                    >
                        {/* Text Column */}
                        <Box flex="1" textAlign={{ base: 'center', md: 'left' }}>
                            <Heading size="2xl" mb={4}>
                                Welcome to {WEB_SITE_TITLE}, Your Ultimate Learning Platform
                            </Heading>
                            <Text fontSize="xl" mb={6}>
                                Discover a world of knowledge with interactive courses, expert instructors, and AI-powered insights to enhance your learning experience.
                            </Text>
                        </Box>
                    </Flex>
                </Container>
            </Box>

            <Box
                as="section"
                // Subtle gradient for the section background
                bgGradient={useColorModeValue(
                    'linear(to-r, white, gray.50)',
                    'linear(to-r, gray.800, gray.900)'
                )}
                py={12}
                px={8}
            >
                <Container maxW="6xl">
                    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
                        {/* Card 1 */}
                        <Box {...cardStyle}>
                            <Stack direction="row" align="center" mb={4}>
                                <Icon as={FaBook} w={6} h={6} color="secondary.700" />
                                <Heading size="md">Extensive Course Library</Heading>
                            </Stack>
                            <Text>
                                Access a vast collection of courses across various subjects, from science to arts and technology.
                            </Text>
                        </Box>

                        {/* Card 2 */}
                        <Box {...cardStyle}>
                            <Stack direction="row" align="center" mb={4}>
                                <Icon as={FaChalkboardTeacher} w={6} h={6} color="secondary.700" />
                                <Heading size="md">Expert Instructors</Heading>
                            </Stack>
                            <Text>
                                Learn from industry professionals and experienced educators who bring real-world insights into the classroom.
                            </Text>
                        </Box>

                        {/* Card 3 */}
                        <Box {...cardStyle}>
                            <Stack direction="row" align="center" mb={4}>
                                <Icon as={FaUserGraduate} w={6} h={6} color="secondary.700" />
                                <Heading size="md">Personalized Learning</Heading>
                            </Stack>
                            <Text>
                                Utilize AI-driven recommendations to personalize your learning path and track your progress effectively.
                            </Text>
                        </Box>
                    </SimpleGrid>
                </Container>
            </Box>

            {/* Innovation & Certification Section */}
            <Box
                mx="auto"
                maxW="70%"
                borderRadius="20"
                bgGradient="linear(to-r, secondary.50, secondary.100)"
                py={12}
                px={8}
            >
                <Container maxW="md" textAlign="center">
                    <Stack direction="row" align="center" justify="center" mb={4}>
                        <Icon as={FaAward} w={8} h={8} color="secondary.700" />
                        <Heading size="lg">Certifications & Career Growth</Heading>
                    </Stack>
                    <Text fontSize="lg">
                        Earn certificates upon course completion and gain skills that enhance your career prospects.
                    </Text>
                </Container>
            </Box>
        </Box>
    );
};