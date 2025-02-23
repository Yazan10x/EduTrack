"use client";

import React from "react";
import {
    Heading,
    Avatar,
    Box,
    Center,
    Text,
    Stack,
    Button,
    Badge,
    useColorModeValue, Spacer,
} from "@chakra-ui/react";

interface Student {
    _id: { $oid: string };
    first_name: string;
    last_name: string;
    username: string;
}

const StudentCard: React.FC<{ student: Student }> = ({ student }) => {
    return (
        <Box
            maxW={"320px"}
            h={"full"}
            w={"full"}
            bg={useColorModeValue("white", "gray.900")}
            boxShadow={"2xl"}
            rounded={"lg"}
            p={6}
            textAlign={"center"}
        >
            <Avatar
                size={"xl"}
                // Replace with the student's avatar URL if available
                name={student.first_name + " " + student.last_name}
                mb={4}
                pos={"relative"}
                _after={{
                    content: '""',
                    w: 4,
                    h: 4,
                    bg: "green.300",
                    border: "2px solid white",
                    rounded: "full",
                    pos: "absolute",
                    bottom: 0,
                    right: 3,
                }}
            />
            <Heading fontSize={"1xl"} fontFamily={"body"}>
                {student.first_name} {student.last_name}
            </Heading>
            <Text fontWeight={600} color={"gray.500"} mb={4}>
                @{student.username}
            </Text>

            {/* Tags / Badges row (optional) */}
            <Stack align={"center"} justify={"center"} direction={"row"} mt={6}>
                <Badge
                    px={2}
                    py={1}
                    bg={useColorModeValue("gray.50", "gray.800")}
                    fontWeight={"400"}
                >
                    #student
                </Badge>
            </Stack>
            <Spacer/>

            <Stack mt={8} direction={"row"} spacing={4}>
                <Button
                    flex={1}
                    bg={"blue.400"}
                    fontSize={"sm"}
                    rounded={"full"}
                    _focus={{
                        bg: "blue.500",
                    }}
                >
                    View Report
                </Button>
            </Stack>
        </Box>
    );
};

export default StudentCard;