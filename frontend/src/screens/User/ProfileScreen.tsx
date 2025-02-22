// src/components/ProfileComponent.tsx

import React, { useState, useEffect } from "react";
import {
    Box,
    FormControl,
    FormLabel,
    Input,
    Button,
    Spinner,
    Avatar,
    Badge,
    Stack,
    Heading,
    useToast,
    Flex,
    Card,
    CardBody,
    CardHeader,
    Divider,
    FormErrorMessage,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    Select,
    Text,
} from "@chakra-ui/react";
import { PhoneIcon, CheckIcon } from "@chakra-ui/icons";
import { ObjectId } from "bson";
import {UsersAPI} from "../../APIs/UsersAPI";
import {User} from "../../models/Models";

// North American phone number format regex (123-456-7890 or (123) 456-7890)
const northAmericanPhoneRegex =
    /^(\+1\s?)?(\(?\d{3}\)?[-.\s]?)\d{3}[-.\s]?\d{4}$/;

// Enum for gender options
export enum GenderEnum {
    Male = "Male",
    Female = "Female",
    RatherNotSay = "Rather not say",
}

const ProfileComponent: React.FC<{ userId?: ObjectId; onClose?: () => void }> = ({
                                                                                     userId,
                                                                                     onClose,
                                                                                 }) => {
    // State
    const [user, setUser] = useState<Partial<User> | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [editing, setEditing] = useState<boolean>(false);
    const [updatedUser, setUpdatedUser] = useState<Partial<User>>({});
    const [phoneError, setPhoneError] = useState<string | null>(null);
    const toast = useToast();

    // Theme-based colors
    const primaryColor = "primary";
    const hoverBg = "primary.50";
    const textColor = "gray.800";
    const backgroundColor = "white";
    const inputBackground = "gray.50";
    const inputTextColor = "gray.800";
    const iconColor = "gray.400";

    // Fetch user data
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = userId
                    ? await UsersAPI.get_user(userId)
                    : await UsersAPI.get_self();
                setUser(userData);
                setUpdatedUser(userData);
            } catch (error: any) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [userId, toast]);

    // Handle input changes with phone validation
    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;

        if (name === "phone_number") {
            if (value && !northAmericanPhoneRegex.test(value)) {
                setPhoneError("Please enter a valid North American phone number.");
            } else {
                setPhoneError(null);
            }
        }

        setUpdatedUser((prev: any) => ({ ...prev, [name]: value }));
    };

    // Save changes
    const handleSave = async () => {
        if (phoneError) {
            toast({
                title: "Validation Error",
                description: "Please correct the phone number before saving.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
            return;
        }

        try {
            await UsersAPI.update_user_profile(updatedUser);
            setUser(updatedUser);
            toast({
                title: "Profile Updated",
                description: "Your profile has been successfully updated.",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            setEditing(false);
        } catch (error) {
            toast({
                title: "Update Failed",
                description: "An error occurred while updating your profile.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
            console.error("Error updating profile:", error);
        }
    };

    // Loading state
    if (loading) {
        return (
            <Box textAlign="center" mt={8}>
                {onClose && (
                    <Button
                        size="sm"
                        variant="outline"
                        onClick={onClose}
                        mb={4}
                        borderColor={primaryColor}
                        color={primaryColor}
                        _hover={{ bg: hoverBg }}
                    >
                        Back
                    </Button>
                )}
                <Spinner size="xl" />
            </Box>
        );
    }

    return (
        <Box maxW="720px" mx="auto" p={4} mt={8}>
            {onClose && (
                <Button
                    size="sm"
                    variant="primary"
                    onClick={onClose}
                    mb={4}
                >
                    Back
                </Button>
            )}

            <Heading size="md" mb={4} color={textColor}>
                Profile details
            </Heading>

            {user ? (
                <Card bg={backgroundColor} boxShadow="md">
                    <CardHeader pb={2}>
                        <Flex direction="column" align="flex-start">
                            <Text fontSize="sm" color="gray.500">
                                Manage your personal information
                            </Text>
                        </Flex>
                    </CardHeader>

                    <Divider />

                    <CardBody>
                        {/* Top row: Avatar, Name, Email */}
                        <Flex alignItems="center" mb={6}>
                            <Avatar
                                size="xl"
                                name={user.full_name}
                                src={user.photo_url}
                                mr={4}
                            />
                            <Box>
                                <Heading size="md" color={textColor}>
                                    {user.full_name}
                                </Heading>
                                {user.email && (
                                    <Badge colorScheme="green" mt={1}>
                                        {user.email}
                                    </Badge>
                                )}
                            </Box>
                        </Flex>

                        {/* Form Fields */}
                        <Stack spacing={4}>
                            <FormControl>
                                <FormLabel color={textColor}>Full Name</FormLabel>
                                <Input
                                    type="text"
                                    name="full_name"
                                    value={updatedUser.full_name || ""}
                                    onChange={handleInputChange}
                                    isDisabled={!editing}
                                    bg={inputBackground}
                                    color={inputTextColor}
                                />
                            </FormControl>

                            <FormControl isInvalid={!!phoneError}>
                                <FormLabel color={textColor}>Phone Number</FormLabel>
                                <InputGroup>
                                    <InputLeftElement pointerEvents="none">
                                        <PhoneIcon color={iconColor} />
                                    </InputLeftElement>
                                    <Input
                                        type="tel"
                                        name="phone_number"
                                        value={updatedUser.phone_number || ""}
                                        placeholder="(555) 123-4567"
                                        onChange={handleInputChange}
                                        isDisabled={!editing}
                                        bg={inputBackground}
                                        color={inputTextColor}
                                    />
                                    {!phoneError && updatedUser.phone_number && (
                                        <InputRightElement>
                                            <CheckIcon color="green.500" />
                                        </InputRightElement>
                                    )}
                                </InputGroup>
                                {phoneError && <FormErrorMessage>{phoneError}</FormErrorMessage>}
                            </FormControl>

                            <FormControl>
                                <FormLabel color={textColor}>Date of Birth</FormLabel>
                                <Input
                                    type="date"
                                    name="dob"
                                    value={
                                        updatedUser.dob
                                            ? new Date(updatedUser.dob).toISOString().substr(0, 10)
                                            : ""
                                    }
                                    onChange={handleInputChange}
                                    isDisabled={!editing}
                                    bg={inputBackground}
                                    color={inputTextColor}
                                />
                            </FormControl>

                            <FormControl>
                                <FormLabel color={textColor}>Gender</FormLabel>
                                <Select
                                    name="gender"
                                    value={updatedUser.gender || ""}
                                    onChange={handleInputChange}
                                    isDisabled={!editing}
                                    bg={inputBackground}
                                    color={inputTextColor}
                                >
                                    {Object.values(GenderEnum).map((genderOption) => (
                                        <option key={genderOption} value={genderOption}>
                                            {genderOption}
                                        </option>
                                    ))}
                                </Select>
                            </FormControl>
                        </Stack>

                        {/* Edit / Save Buttons */}
                        {editing ? (
                            <Button colorScheme="blue" mt={6} onClick={handleSave}>
                                Save Changes
                            </Button>
                        ) : (
                            <Button
                                variant="outline"
                                mt={6}
                                onClick={() => setEditing(true)}
                                borderColor={primaryColor}
                                color={primaryColor}
                                _hover={{ bg: hoverBg }}
                            >
                                Edit Profile
                            </Button>
                        )}
                    </CardBody>
                </Card>
            ) : (
                <Box textAlign="center" color={textColor}>
                    No user profile found.
                </Box>
            )}
        </Box>
    );
};

export default ProfileComponent;