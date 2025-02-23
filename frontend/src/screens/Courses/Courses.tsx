import React, { useState, useEffect } from "react";
import {
    Flex,
    Heading,
    Button,
    Spinner,
    Stack,
    Box,
    Text,
    useDisclosure
} from "@chakra-ui/react";
import CreateCourseDialog from "./CreateCourseDialog";
import { CoursesAPI } from "../../APIs/CoursesAPI";

// Inline CourseCard component to display individual course details
const CourseCard = ({ course }: { course: any }) => {
    // Extract teacher ID from the teachers array (if available)
    const teacher =
        Array.isArray(course.teachers) && course.teachers.length > 0
            ? course.teachers[0].$oid || course.teachers[0]
            : "Unknown";

    return (
        <Box borderWidth="1px" borderRadius="md" p={4} bg="white" shadow="sm">
            <Heading as="h3" size="md" mb={2}>
                {course.name || "Unnamed Course"}
            </Heading>
            <Text mb={1}>Course Code: {course.course_code || "N/A"}</Text>
            <Text mb={1}>Teacher: {teacher}</Text>
            {course.semester && course.semester.name && (
                <Text fontSize="sm" color="gray.500">
                    Semester: {course.semester.name}
                </Text>
            )}
        </Box>
    );
};

export default function Courses() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [courses, setCourses] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                // Assume CoursesAPI.get_courses returns the entire response object
                const data = await CoursesAPI.get_courses();
                // Extract the courses array from the response
                console.log(data)
                setCourses(data);
            } catch (error) {
                console.error("Error fetching courses:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    return (
        <Flex direction="column" p={6}>
            {/* Top Header */}
            <Flex justify="space-between" align="center" mb={4}>
                <Heading as="h1" size="lg">
                    Courses
                </Heading>
                <Button colorScheme="blue" onClick={onOpen}>
                    + Create Class
                </Button>
            </Flex>

            {/* CreateCourseDialog Modal */}
            <CreateCourseDialog isOpen={isOpen} onClose={onClose} />

            {/* Courses List */}
            {loading ? (
                <Spinner size="xl" alignSelf="center" />
            ) : (
                <Stack spacing={4}>
                    {courses.map((course: any) => (
                        <CourseCard key={course._id.$oid} course={course} />
                    ))}
                </Stack>
            )}
        </Flex>
    );
}