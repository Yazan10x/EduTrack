import React, { useState, useEffect } from "react";
import {
    Box,
    Avatar,
    Text,
    Stack,
    Spinner,
    Heading,
    useColorModeValue,
    Flex,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
} from "@chakra-ui/react";
import { User } from "../../models/Models";
import { UsersAPI } from "../../APIs/UsersAPI";
import { ObjectId } from "bson";
import Button from "../../ui/button/Button";

interface UsersListProps {
    onSelectUser: (userId: ObjectId) => void;
}

const UsersList: React.FC<UsersListProps> = ({ onSelectUser }) => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    // State to keep track of which user's email is hovered
    const [hoveredUserId, setHoveredUserId] = useState<ObjectId | null>(null);

    const textColor = useColorModeValue("light.text", "dark.text");
    const bgColor = useColorModeValue("light.background", "dark.background");

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const allUsers = await UsersAPI.get_users();
                setUsers(allUsers);
            } catch (error) {
                console.error("Failed to fetch users:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (loading) {
        return (
            <Box textAlign="center" mt={8}>
                <Spinner size="xl" />
            </Box>
        );
    }

    return (
        <Box p={4} bg={bgColor} borderRadius="md" boxShadow="md">
            <Heading size="md" mb={4} color={textColor}>
                Users List
            </Heading>
            <Table variant="simple" colorScheme="gray">
                <Thead>
                    <Tr>
                        <Th>Name</Th>
                        <Th>Email</Th>
                        <Th>Actions</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {users.map((user) => (
                        <Tr key={user._id.toHexString()}>
                            <Td>
                                <Flex align="center">
                                    <Avatar
                                        size="sm"
                                        name={user.full_name}
                                        src={user.photo_url}
                                        mr={2}
                                    />
                                    <Text color={textColor}>{user.full_name}</Text>
                                </Flex>
                            </Td>
                            <Td>
                                <Flex
                                    align="center"
                                    justify="center"
                                    px={3}
                                    py={2}
                                    borderRadius="md"
                                    bg="gray.100"
                                    _hover={{ bg: "blue.100", cursor: "pointer" }}
                                    minH="40px"
                                    minW="250px"
                                    maxW="300px"
                                    onClick={() => navigator.clipboard.writeText(user.email)}
                                    onMouseEnter={() => setHoveredUserId(user._id)}
                                    onMouseLeave={() => setHoveredUserId(null)}
                                    role="button"
                                    tabIndex={0}
                                >
                                    <Text color={textColor} fontWeight="medium">
                                        {hoveredUserId?.equals(user._id) ? "Copy Email" : user.email}
                                    </Text>
                                </Flex>
                            </Td>
                            <Td>
                                <Button
                                    size="sm"
                                    colorScheme="blue"
                                    onClick={() => onSelectUser(user._id)}
                                >
                                    View Profile
                                </Button>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </Box>
    );
};

export default UsersList;