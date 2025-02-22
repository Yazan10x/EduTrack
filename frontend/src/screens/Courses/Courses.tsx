import React from "react";
import {
    Flex,
    Heading,
    Button,
    useDisclosure
} from "@chakra-ui/react";
import CreateCourseDialog from "./CreateCourseDialog";

export default function Courses() {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Flex direction="column" p={6}>
            {/* Top Header */}
            <Flex justify="space-between" align="center" mb={4}>
                <Heading as="h1" size="lg">
                    Courses
                </Heading>

                {/* Button in top-right */}
                <Button colorScheme="blue" onClick={onOpen}>
                    + Create Class
                </Button>
            </Flex>

            {/* CreateCourseDialog Modal */}
            <CreateCourseDialog isOpen={isOpen} onClose={onClose} />
        </Flex>
    );
}