import React, { useEffect } from 'react';
import { Box, Center, VStack, Text, Heading } from '@chakra-ui/react';
import { useAuth } from '../../utils/firebase/authContext';
import { useNavigate } from 'react-router-dom';
import {WEB_SITE_TITLE} from "../../components/SidebarWithHeader";

const Logout = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const performLogout = async () => {
            await logout();
            navigate('/login');
        };
        performLogout().then();
    }, [logout, navigate]);

    return (
        <Center height="100vh" bg="gray.50">
            <Box p={8} maxWidth="md" borderWidth={1} borderRadius="lg" boxShadow="lg" bg="white">
                <VStack spacing={4}>
                    <Heading as="h1" size="xl">Thank You</Heading>
                    <Text fontSize="lg" fontWeight="bold">Thank you for using {WEB_SITE_TITLE}</Text>
                    <Text fontSize="md" textAlign="center">
                        You have been logged out. Please close this tab.
                    </Text>
                </VStack>
            </Box>
        </Center>
    );
};

export default Logout;