import React from "react";
import {
  Box,
  Container,
  Flex,
  VStack,
  Heading,
  Text,
  SimpleGrid,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Icon,
  useToast,
} from "@chakra-ui/react";
import { FaMailBulk, FaMap, FaPhone } from "react-icons/fa";

export default function Contact() {
  const toast = useToast();
  const [first, setFirst] = React.useState("");
  const [last, setLast] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!first || !last || !email || !message) {
      toast({
        title: "Error",
        description: "Please fill out all fields.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    toast({
      title: "Message sent!",
      description: "We'll get back to you as soon as possible.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <Container maxW="6xl" py={10}>
      <VStack spacing={8} align="stretch">
        {/* Header Section */}
        <Box textAlign="center">
          <Heading
            color="primary.900"
            fontSize={{ base: "2xl", md: "3xl" }}
            mb={4}
          >
            Get in Touch
          </Heading>
          <Text
            color="neutral.600"
            fontSize={{ base: "md", md: "lg" }}
            maxW="2xl"
            mx="auto"
          >
            Have questions? We'd love to hear from you. Send us a message and
            we'll respond as soon as possible.
          </Text>
        </Box>

        {/* Contact Info Cards */}
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mb={8}>
          <Flex
            direction="column"
            align="center"
            p={6}
            bg="primary.50"
            borderRadius="lg"
            transition="all 0.3s"
            _hover={{ transform: "translateY(-5px)", shadow: "md" }}
          >
            <Icon as={FaMailBulk} w={6} h={6} color="secondary.700" mb={4} />
            <Text fontWeight="bold" color="primary.800">
              Email
            </Text>
            <Text color="neutral.600">anask.almasri@gmail.com</Text>
          </Flex>

          <Flex
            direction="column"
            align="center"
            p={6}
            bg="primary.50"
            borderRadius="lg"
            transition="all 0.3s"
            _hover={{ transform: "translateY(-5px)", shadow: "md" }}
          >
            <Icon as={FaPhone} w={6} h={6} color="secondary.700" mb={4} />
            <Text fontWeight="bold" color="primary.800">
              Phone
            </Text>
            <Text color="neutral.600">+1 (519) 884-1970</Text>
          </Flex>

          <Flex
            direction="column"
            align="center"
            p={6}
            bg="primary.50"
            borderRadius="lg"
            transition="all 0.3s"
            _hover={{ transform: "translateY(-5px)", shadow: "md" }}
          >
            <Icon as={FaMap} w={6} h={6} color="secondary.700" mb={4} />
            <Text fontWeight="bold" color="primary.800">
              Location
            </Text>
            <Text color="neutral.600" textAlign="center">
              64 University Ave W, Waterloo, ON <br /> N2L 3C7
            </Text>
          </Flex>
        </SimpleGrid>

        {/* Contact Form */}
        <Box
          as="form"
          onSubmit={handleSubmit}
          bg="white"
          p={8}
          borderRadius="lg"
          shadow="sm"
          borderWidth="1px"
          borderColor="neutral.200"
        >
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mb={6}>
            <FormControl isRequired>
              <FormLabel color="neutral.700">First Name</FormLabel>
              <Input
                type="text"
                borderColor="neutral.300"
                _hover={{ borderColor: "primary.400" }}
                _focus={{
                  borderColor: "secondary.500",
                  boxShadow: "0 0 0 1px var(--chakra-colors-secondary-500)",
                }}
                onChange={(e) => setFirst(e.target.value)}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel color="neutral.700">Last Name</FormLabel>
              <Input
                type="text"
                borderColor="neutral.300"
                _hover={{ borderColor: "primary.400" }}
                _focus={{
                  borderColor: "secondary.500",
                  boxShadow: "0 0 0 1px var(--chakra-colors-secondary-500)",
                }}
                onChange={(e) => setLast(e.target.value)}
              />
            </FormControl>
          </SimpleGrid>

          <FormControl isRequired mb={6}>
            <FormLabel color="neutral.700">Email</FormLabel>
            <Input
              type="email"
              borderColor="neutral.300"
              _hover={{ borderColor: "primary.400" }}
              _focus={{
                borderColor: "secondary.500",
                boxShadow: "0 0 0 1px var(--chakra-colors-secondary-500)",
              }}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>

          <FormControl isRequired mb={6}>
            <FormLabel color="neutral.700">Message</FormLabel>
            <Textarea
              rows={5}
              borderColor="neutral.300"
              _hover={{ borderColor: "primary.400" }}
              _focus={{
                borderColor: "secondary.500",
                boxShadow: "0 0 0 1px var(--chakra-colors-secondary-500)",
              }}
              onChange={(e) => setMessage(e.target.value)}
            />
          </FormControl>

          <Button
            type="submit"
            bg="secondary.700"
            color="white"
            size="lg"
            w={{ base: "full", md: "auto" }}
            _hover={{ bg: "secondary.800" }}
            _active={{ bg: "secondary.900" }}
          >
            Send Message
          </Button>
        </Box>
      </VStack>
    </Container>
  );
}
