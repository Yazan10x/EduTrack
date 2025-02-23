import React from "react";
import {
  Box,
  Container,
  Grid,
  Heading,
  Text,
  Button,
  Icon,
  useColorModeValue,
  VStack,
  HStack,
} from "@chakra-ui/react";
import {
  FaBook,
  FaUserGraduate,
  FaCalendar,
  FaBrain,
  FaShieldAlt,
  FaArrowRight,
  FaChartLine,
} from "react-icons/fa";

interface FeatureCardProps {
  icon: any;
  title: string;
  description: string;
}
const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
}) => {
  const cardBg = useColorModeValue("white", "neutral.800");
  const iconBg = useColorModeValue("secondary.50", "secondary.900");
  const textColor = useColorModeValue("neutral.600", "neutral.300");

  return (
    <Box
      bg={cardBg}
      p={6}
      rounded="xl"
      shadow="lg"
      height="100%"
      transition="all 0.3s"
      _hover={{
        transform: "translateY(-4px)",
        shadow: "xl",
      }}
    >
      <HStack align="start" spacing={4}>
        <Box p={2} bg={iconBg} rounded="lg" color="secondary.500">
          <Icon as={icon} boxSize={6} />
        </Box>
        <VStack align="start" spacing={2}>
          <Heading
            size="md"
            color={useColorModeValue("neutral.800", "neutral.50")}
          >
            {title}
          </Heading>
          <Text color={textColor}>{description}</Text>
        </VStack>
      </HStack>
    </Box>
  );
};

const Features = () => {
  const gradientText = useColorModeValue(
    "linear(to-r, secondary.500, secondary.700)",
    "linear(to-r, secondary.400, secondary.600)"
  );
  const ctaBg = useColorModeValue(
    "linear(to-r, secondary.600, secondary.700)",
    "linear(to-r, secondary.500, secondary.600)"
  );

  return (
    <Box
      minH="100vh"
      bg={useColorModeValue(
        "linear(to-b, primary.50, white)",
        "linear(to-b, neutral.900, neutral.800)"
      )}
      py={16}
    >
      {/* Hero Section */}
      <Container maxW="7xl" textAlign="center" mb={16}>
        <Heading
          as="h1"
          size="2xl"
          mb={6}
          bgGradient={gradientText}
          bgClip="text"
        >
          Transform Your Teaching Experience
        </Heading>
        <Text
          fontSize="xl"
          color={useColorModeValue("neutral.600", "neutral.300")}
          maxW="2xl"
          mx="auto"
        >
          EduTrack brings intelligent tools and insights to your classroom,
          helping you focus on what matters most—your students.
        </Text>
      </Container>

      {/* Features Grid - Equal sized cards */}
      <Container maxW="7xl">
        <Grid
          templateColumns={{
            base: "1fr",
            md: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
          }}
          gap={6}
        >
          <FeatureCard
            icon={FaBrain}
            title="AI-Powered Insights"
            description="Leverage advanced AI algorithms to receive personalized recommendations for each student's learning journey."
          />
          <FeatureCard
            icon={FaBook}
            title="Smart Assignment Tracking"
            description="Our intelligent system automatically organizes and prioritizes assignments, providing real-time updates on submission status."
          />
          <FeatureCard
            icon={FaUserGraduate}
            title="Student Progress Dashboard"
            description="Get comprehensive insights into individual and class-wide performance with our intuitive analytics dashboard."
          />
          <FeatureCard
            icon={FaCalendar}
            title="Classroom Management"
            description="Seamlessly integrate with Google Classroom to manage all your educational resources in one place."
          />
          <FeatureCard
            icon={FaChartLine}
            title="Insightful Dashboard"
            description="Explore detailed statistics and analytics on your dashboard to uncover trends, track progress, and gain actionable insights for your classroom."
          />
          <FeatureCard
            icon={FaShieldAlt}
            title="Role-Based Access Control"
            description="Ensure secure and precise access management with our advanced role-based authentication system, tailored to protect your classroom data."
          />
        </Grid>

        {/* Call to Action */}
        <Box
          mt={16}
          p={8}
          rounded="2xl"
          bgGradient={ctaBg}
          color="white"
          textAlign="center"
        >
          <Heading size="lg" mb={4}>
            Ready to Revolutionize Your Classroom?
          </Heading>
          <Text fontSize="lg" mb={8} maxW="2xl" mx="auto" opacity={0.9}>
            Join thousands of educators who are already using EduTrack to
            transform their teaching experience and enhance student outcomes.
          </Text>
          <Button
            size="lg"
            bg="white"
            color="secondary.600"
            rightIcon={<Icon as={FaArrowRight} />}
            _hover={{
              bg: "neutral.100",
              color: "secondary.700",
            }}
            onClick={() => window.open(process.env.REACT_APP_DASHBOARD_SITE_ADDRESS, '_blank')}
          >
            Get Started Free
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Features;
