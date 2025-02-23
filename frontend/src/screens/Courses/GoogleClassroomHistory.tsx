"use client";

import React from "react";
import {
    Heading,
    Avatar,
    Box,
    Text,
    Stack,
    Button,
    Badge,
    useColorModeValue, Spacer,
} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";

interface Student {
    _id: { $oid: string };
    first_name: string;
    last_name: string;
    username: string;
}

const GoogleClassroomHistory: React.FC<{ student: Student }> = ({ student }) => {

    let navigate = useNavigate()

    return (
        <>
        </>
    );
};

export default GoogleClassroomHistory;