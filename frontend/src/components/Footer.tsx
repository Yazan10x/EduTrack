import {
    Box,
    chakra,
    Container,
    SimpleGrid,
    Stack,
    Text,
    VisuallyHidden,
    Input,
    IconButton,
    useColorModeValue,
    Image, useToast, Spacer,
} from '@chakra-ui/react'
import React, {ReactNode, useState} from 'react'
import { FaGithub, FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from 'react-icons/fa'
import { BiMailSend } from 'react-icons/bi'
import {RiMailSendFill, SiTiktok, SiTwitter} from "react-icons/all";
import {useNavigate} from "react-router-dom";
import {WEB_SITE_TITLE} from "./SidebarWithHeader";
import {UsersAPI} from "../APIs/UsersAPI";

const SocialButton = ({
                          children,
                          label,
                          href,
                      }: {
    children: ReactNode
    label: string
    href: string
}) => {
    return (
        <chakra.button
            bg={useColorModeValue('primary.50', 'primary.800')}
            rounded={'full'}
            w={8}
            h={8}
            cursor={'pointer'}
            as={'a'}
            href={href}
            target="_blank" // Opens in a new tab
            rel="noopener noreferrer" // Security measure for external links
            display={'inline-flex'}
            alignItems={'center'}
            justifyContent={'center'}
            transition={'background 0.3s ease'}
            _hover={{
                bg: useColorModeValue('primary.100', 'primary.600'),
            }}>
            <VisuallyHidden>{label}</VisuallyHidden>
            {children}
        </chakra.button>
    )
}

const ListHeader = ({ children }: { children: ReactNode }) => {
    return (
        <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
            {children}
        </Text>
    )
}

export default function Footer() {

    const navigate = useNavigate();
    const toast = useToast(); // Initialize toast for notifications
    const [email, setEmail] = useState(''); // State for email input
    const [isSubmitting, setIsSubmitting] = useState(false); // State to manage submission status

    // Handler function for subscribing to the newsletter
    const handleSubscribe = async () => {
        if (!email) {
            toast({
                title: "Email is required.",
                status: "warning",
                duration: 3000,
                isClosable: true,
            });
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast({
                title: "Invalid email format.",
                status: "warning",
                duration: 3000,
                isClosable: true,
            });
            return;
        }
        setIsSubmitting(true);
        try {
            const message = await UsersAPI.subscribe_to_newsletter(email);
            toast({
                title: "Subscription Successful.",
                description: message,
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            setEmail(''); // Clear the input field upon success
        } catch (error) {
            toast({
                title: "Subscription Failed.",
                description: "An error occurred.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Box
            bg={useColorModeValue('background', 'background')}
            color={useColorModeValue('text', 'text')}>
            <Container as={Stack} maxW={'6xl'} py={10}>
                <SimpleGrid
                    templateColumns={{ sm: '1fr 1fr', md: '2fr 1fr 1fr 2fr' }}
                    spacing={8}>
                    <Stack spacing={6}>
                        <Spacer></Spacer>
                        <Box>
                            <Image
                                src="/logo1.png"
                                mb={8}
                                maxW="100px"
                                mx="auto"
                            />
                        </Box>
                        <Text fontSize={'sm'}>© 2025 {WEB_SITE_TITLE}. All rights reserved</Text>
                    </Stack>
                    <Stack align={'flex-start'}>
                        <ListHeader><Text fontWeight='bold'>Company</Text></ListHeader>
                        <Box as="a" href={process.env.REACT_APP_LANDING_SITE_ADDRESS} target="_blank" rel="noopener noreferrer">
                            Home
                        </Box>
                        <Box as="a" href={`${process.env.REACT_APP_LANDING_SITE_ADDRESS}/features`} target="_blank" rel="noopener noreferrer">
                            Features
                        </Box>
                        <Box as="a" href={`${process.env.REACT_APP_LANDING_SITE_ADDRESS}/mission`} target="_blank" rel="noopener noreferrer">
                            About Us
                        </Box>
                    </Stack>
                    <Stack align={'flex-start'}>
                        <ListHeader><Text fontWeight='bold'>Support</Text></ListHeader>
                        {/* <Box as="a" href={`#`} target="_blank" rel="noopener noreferrer">
                            Help Center
                        </Box> */}
                        <Box as="a" href={`${process.env.REACT_APP_LANDING_SITE_ADDRESS}/contact`} target="_blank" rel="noopener noreferrer">
                            Contact us
                        </Box>
                        <Box as="a" href={`#`} target="_blank" rel="noopener noreferrer">
                            Terms of Service
                        </Box>
                        {/* <Box as="a" href={`#`} target="_blank" rel="noopener noreferrer">
                            Legal Policy
                        </Box> */}
                        <Box as="a" href={`#`} target="_blank" rel="noopener noreferrer">
                            Privacy Policy
                        </Box>
                        {/*<Box as="a" href={`${process.env.REACT_APP_LANDING_SITE_ADDRESS}/status`} target="_blank" rel="noopener noreferrer">*/}
                        {/*    Status*/}
                        {/*</Box>*/}
                    </Stack>
                    <Stack align={'flex-start'}>
                        <ListHeader>Stay up to date</ListHeader>
                        <Stack direction={'row'}>
                            <Input
                                placeholder={'Your email address'}
                                value={email} // Bind input value to state
                                onChange={(e) => setEmail(e.target.value)} // Update state on change
                                bg={useColorModeValue('primary.50', 'primary.800')}
                                border={0}
                                _focus={{
                                    bg: useColorModeValue('primary.100', 'primary.600'),
                                }}
                            />
                            <IconButton
                                bg={useColorModeValue('primary.50', 'primary.700')}
                                color={useColorModeValue('text', 'white')}
                                aria-label="Subscribe"
                                icon={<RiMailSendFill />}
                                onClick={handleSubscribe} // Attach handler function
                                isLoading={isSubmitting} // Show loading state
                                disabled={isSubmitting} // Disable button while submitting
                            />
                        </Stack>
                        <Stack direction={'row'} spacing={6}>
                            <SocialButton label={'LinkedIn'} href={'https://www.linkedin.com/in/anousalma'}>
                                <FaLinkedin />
                            </SocialButton>
                            <SocialButton label={'Github'} href={'https://github.com/Yazan10x/EduTrack'}>
                                <FaGithub />
                            </SocialButton>
                            <SocialButton label={'Twitter'} href={'https://x.com/yazanarmoush'}>
                                <FaTwitter />
                            </SocialButton>
                        </Stack>
                    </Stack>
                </SimpleGrid>
            </Container>
        </Box>
    )
}