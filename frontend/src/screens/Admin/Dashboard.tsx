import React, { useEffect, useState } from 'react';
import {
    Box,
    Heading,
    Spacer,
} from '@chakra-ui/react';
import { Chart, registerables } from 'chart.js';
import { useAuth } from '../../utils/firebase/authContext';

// Initialize Chart.js
Chart.register(...registerables);

const AdminDashboard: React.FC = () => {
    const { user } = useAuth();


    return (
        <Box p={[4, 6, 8]}>
            {/* Greeting for Admin */}
            <Heading as="h1" size="xl" mb={6}>
                Welcome {user?.full_name}
            </Heading>

            {/* Main Dashboard Heading */}
            <Heading as="h2" size="lg" textAlign="center" mb={2}>
                Admin Dashboard Overview
            </Heading>
            <Spacer h="25px" />

        </Box>
    );
};

export default AdminDashboard;