    import React, {useEffect, useRef, useState} from 'react';
    import {
    Box,
    Heading,
    useColorModeValue,
    GridItem, Center, Spacer
    } from '@chakra-ui/react';
    import { Chart, registerables } from 'chart.js';
    import {useAuth} from "../utils/firebase/authContext";
    import {formatDistanceToNow, isPast} from "date-fns";

    Chart.register(...registerables);

    
    const Dashboard: React.FC = () => {
        const user = useAuth().user;
        const [time_left, set_time_left] = useState<string | undefined>(undefined);

        return (
            <Box p={[4, 6, 8]}>
                <Heading as="h1" size="xl" mb={6}>Welcome {user?.full_name} </Heading>
                {/*<Heading as="h1" size="xl" textAlign="center" mb={2}>Dashboard Overview</Heading>*/}

                <Spacer h={"25px"}/>
            </Box>
        );
    };

    export default Dashboard;