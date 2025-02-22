import React, { useState } from 'react';
import { Tabs, TabList, Tab, useColorModeValue, Box } from '@chakra-ui/react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import UsersList from './UsersList';
import ProfileComponent from "../../components/ProfileComponent";
import { ObjectId } from "bson";
import Dashboard from "./Dashboard";

const AdminPortal: React.FC = () => {
    const bg = useColorModeValue('light.background', 'dark.background');
    const textColor = useColorModeValue('light.text', 'dark.text');
    const tabSelectedColor = useColorModeValue('light.primary.500', 'dark.primary.500');
    const navigate = useNavigate();
    const location = useLocation();

    // State to handle selected user
    const [selectedUserId, setSelectedUserId] = useState<ObjectId | null>(null);

    // Function to handle selecting a user
    const handleSelectUser = (userId: ObjectId) => {
        setSelectedUserId(userId);
    };

    // Function to handle closing the profile
    const handleCloseProfile = () => {
        setSelectedUserId(null);
    };

    // Function to handle tab change and navigate to correct URL
    const handleTabChange = (index: number) => {
        switch (index) {
            case 0:
                navigate('');
                break;
            case 1:
                navigate('users');
                break;
            default:
                navigate('');
        }
    };

    // Determine the active tab based on the URL
    const getCurrentTabIndex = () => {
        if (location.pathname.includes('users')) return 1;
        return 0; // Default to 'Dashboard'
    };

    return (
        <Box bg={bg} color={textColor} p={4}>
            <Tabs isFitted variant="enclosed" index={getCurrentTabIndex()} onChange={handleTabChange}>
                <TabList mb="1em">
                    <Tab _selected={{ color: tabSelectedColor }}>Dashboard</Tab>
                    <Tab _selected={{ color: tabSelectedColor }}>Users</Tab>
                </TabList>

                <Routes>
                    {/* Redirect from /admin to /admin/users */}
                    <Route path="/" element={<Dashboard/>} />

                    <Route
                        path="users"
                        element={
                            selectedUserId ? (
                                <ProfileComponent userId={selectedUserId} onClose={handleCloseProfile} />
                            ) : (
                                <UsersList onSelectUser={handleSelectUser} />
                            )
                        }
                    />
                </Routes>
            </Tabs>
        </Box>
    );
};

export default AdminPortal;
