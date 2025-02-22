import React from 'react';
import {
    Box,
    Flex,
    Heading,
    Text,
    useColorModeValue,
    Container,
    Icon,
    Stack,
    Button,
    keyframes,
} from '@chakra-ui/react';
import { FaBook, FaUserGraduate, FaChalkboardTeacher, FaLightbulb, FaAward, FaLock } from 'react-icons/fa';

// Animation for hover effect
const float = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0); }
`;

const Features: React.FC = () => {
    const floatAnimation = `${float} 2s ease-in-out infinite`;

    // Card style with hover animation
    const cardStyle = {
        p: 6,
        textAlign: 'center' as const,
        bg: useColorModeValue('white', 'gray.800'),
        borderRadius: 'lg',
        boxShadow: 'lg',
        transition: 'all 0.3s ease',
        _hover: {
            animation: floatAnimation,
            boxShadow: 'xl',
        },
    };

    return (
        <Box bg={'white.50'} color="text" py={12} position="relative" overflow="hidden">
            {/* Background Gradients */}
            <Box
                position="absolute"
                top="0"
                left="0"
                w="100%"
                h="100%"
                zIndex={0}
                bgGradient={useColorModeValue(
                    'radial(circle at top left, secondary.50, transparent), radial(circle at bottom right, primary.50, transparent)',
                    'radial(circle at top left, gray.800, transparent), radial(circle at bottom right, gray.900, transparent)'
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
                    'linear(to-b, primary.50, transparent)',
                    'linear(to-b, gray.700, transparent)'
                )}
                opacity={0.5}
            />

            {/* Hero Section */}
            <Container maxW="7xl" textAlign="center" mb={12} position="relative" zIndex={1}>
                <Heading size="2xl" mb={4} bgGradient="linear(to-r, secondary.400, primary.500)" bgClip="text">
                    Features Designed for Teachers
                </Heading>
                <Text fontSize="xl" color={useColorModeValue('gray.600', 'gray.300')}>
                    EduTrack is built to simplify your workload and help you focus on what matters most—your students.
                </Text>
            </Container>

            {/* Features Grid */}
            <Container maxW="6xl" position="relative" zIndex={1}>
                {/* First Row */}
                <Flex direction={{ base: 'column', md: 'row' }} gap={8} mb={8}>
                    <Box {...cardStyle} flex={1}>
                        <Stack direction="column" align="center" spacing={4}>
                            <Icon as={FaBook} w={10} h={10} color="secondary.700" />
                            <Heading size="md">Assignment Tracking</Heading>
                            <Text>
                                Easily track submitted, late, and pending assignments—all in one organized dashboard.
                            </Text>
                        </Stack>
                    </Box>
                    <Box {...cardStyle} flex={1}>
                        <Stack direction="column" align="center" spacing={4}>
                            <Icon as={FaUserGraduate} w={10} h={10} color="secondary.700" />
                            <Heading size="md">Student Insights</Heading>
                            <Text>
                                Get personalized insights into each student’s learning style, progress, and growth areas.
                            </Text>
                        </Stack>
                    </Box>
                </Flex>

                {/* Second Row */}
                <Flex direction={{ base: 'column', md: 'row' }} gap={8} mb={8}>
                    <Box {...cardStyle} flex={1}>
                        <Stack direction="column" align="center" spacing={4}>
                            <Icon as={FaChalkboardTeacher} w={10} h={10} color="secondary.700" />
                            <Heading size="md">Classroom Management</Heading>
                            <Text>
                                Manage Google Classrooms, track performance, and access everything in one place.
                            </Text>
                        </Stack>
                    </Box>
                    <Box {...cardStyle} flex={1}>
                        <Stack direction="column" align="center" spacing={4}>
                            <Icon as={FaLightbulb} w={10} h={10} color="secondary.700" />
                            <Heading size="md">AI-Powered Recommendations</Heading>
                            <Text>
                                Receive actionable steps to help each student grow, powered by AI-driven insights.
                            </Text>
                        </Stack>
                    </Box>
                </Flex>

                {/* Third Row */}
                <Flex direction={{ base: 'column', md: 'row' }} gap={8}>
                    <Box {...cardStyle} flex={1}>
                        <Stack direction="column" align="center" spacing={4}>
                            <Icon as={FaAward} w={10} h={10} color="secondary.700" />
                            <Heading size="md">Time-Saving Tools</Heading>
                            <Text>
                                Automate repetitive tasks and spend more time teaching, not managing.
                            </Text>
                        </Stack>
                    </Box>
                    <Box {...cardStyle} flex={1}>
                        <Stack direction="column" align="center" spacing={4}>
                            <Icon as={FaLock} w={10} h={10} color="secondary.700" />
                            <Heading size="md">Secure & Reliable</Heading>
                            <Text>
                                Built with privacy and security in mind, so your data is always safe.
                            </Text>
                        </Stack>
                    </Box>
                </Flex>
            </Container>

            {/* Call-to-Action Section */}
            <Box
                mt={12}
                py={12}
                bgGradient={useColorModeValue(
                    'linear(to-r, secondary.50, secondary.100)',
                    'linear(to-r, gray.800, gray.900)'
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

                <Container maxW="md" textAlign="center" position="relative" zIndex={1}>
                    <Heading size="lg" mb={4} bgGradient="linear(to-r, secondary.400, primary.500)" bgClip="text">
                        Ready to Transform Your Classroom?
                    </Heading>
                    <Text fontSize="lg" mb={6} color={useColorModeValue('gray.600', 'gray.300')}>
                        Join thousands of teachers using EduTrack to save time and help their students thrive.
                    </Text>
                    <Button colorScheme="secondary" size="lg">
                        Get Started Now
                    </Button>
                </Container>
            </Box>
        </Box>
    );
};

export default Features;