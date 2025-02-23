import React from 'react';
import {
Box,
useColorModeValue,
Stack
} from '@chakra-ui/react';
import { Chart, registerables } from 'chart.js';
import MainGrid from '../components/MainGrid';

Chart.register(...registerables);


const Dashboard: React.FC = () => {
    const bgColor = useColorModeValue("white", "gray.900");

    return (
        <Box display="flex">
        <Box
            as="main"
            flexGrow={1}
            bg={bgColor}
            overflow="auto"
            p={4}
        >
            <Stack spacing={4} align="center" mx={3} pb={5} mt={{ base: 8, md: 0 }}>
            <MainGrid />
            </Stack>
        </Box>
        </Box>
    );
};

export default Dashboard;