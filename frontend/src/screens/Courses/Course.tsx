import React, { useState, useEffect } from "react";
import {
    Flex,
    Heading,
    Spinner,
    Box,
    Text,
    Divider,
} from "@chakra-ui/react";
import { CoursesAPI } from "../../APIs/CoursesAPI";

interface CourseProps {
    courseId: string;
}

const Course: React.FC<CourseProps> = ({ courseId }) => {
    const [course, setCourse] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const data = await CoursesAPI.get_course(courseId);
                setCourse(data);
            } catch (error) {
                console.error("DEBUG: Error fetching course:", error);
                setError("Failed to load course details.");
            } finally {
                setLoading(false);
            }
        };

        fetchCourse();
    }, [courseId]);

    if (loading) {
        return (
            <Flex justify="center" align="center" height="100vh">
                <Spinner size="xl" />
            </Flex>
        );
    }

    if (error || !course) {
        return (
            <Flex justify="center" align="center" height="100vh">
                <Text color="red.500">{error || "Course not found."}</Text>
            </Flex>
        );
    }

    const teacher =
        Array.isArray(course.teachers) && course.teachers.length > 0
            ? course.teachers[0]?.$oid || course.teachers[0]
            : "Unknown";

    return (
        <Flex direction="column" p={6} maxWidth="600px" margin="auto">
            <Box borderWidth="1px" borderRadius="md" p={6} bg="white" shadow="md">
                <Heading as="h2" size="lg" mb={2}>
                    {course.name || "Unnamed Course"}
                </Heading>
                <Divider mb={4} />
                <Text fontSize="md" fontWeight="bold" mb={2}>
                    Course Code: <Text as="span" fontWeight="normal">{course.course_code || "N/A"}</Text>
                </Text>
                <Text fontSize="md" fontWeight="bold" mb={2}>
                    Teacher: <Text as="span" fontWeight="normal">{teacher}</Text>
                </Text>
                {course.semester && course.semester.name && (
                    <Text fontSize="md" fontWeight="bold">
                        Semester: <Text as="span" fontWeight="normal">{course.semester.name}</Text>
                    </Text>
                )}
            </Box>
        </Flex>
    );
};

export default Course;