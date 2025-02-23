import { ExternalLinkIcon } from "@chakra-ui/icons";
import React, {useEffect, useState} from "react";
import {
    Flex,
    Heading,
    Button,
    Spinner,
    Stack,
    Box,
    Text,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    Link,
} from "@chakra-ui/react";
import { CoursesAPI } from "../../APIs/CoursesAPI";
import Course from "./Course";
import CreateCourseDialog from "./CreateCourseDialog";

const CourseCard = ({ course }: { course: any }) => {
    const { isOpen, onOpen, onClose } = useDisclosure(); // For course details modal

    const courseId = course._id?.$oid || course._id || null;
    const teacher =
        Array.isArray(course.teachers) && course.teachers.length > 0
            ? course.teachers[0]?.$oid || course.teachers[0]
            : "Unknown";

    const [gclassUrl, setGclassUrl] = useState<string | null>(null);
    const [loadingGclass, setLoadingGclass] = useState<boolean>(false);

    const fetchGclassUrl = async () => {
        if (!courseId) return;
        setLoadingGclass(true);
        try {
            const url = await CoursesAPI.get_gclass_url(courseId);
            setGclassUrl(url);
            window.open(url, "_blank"); // Open Google Classroom URL in a new tab
        } catch (error) {
            console.error("Error fetching Google Classroom URL:", error);
        } finally {
            setLoadingGclass(false);
        }
    };

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
            {courseId && (
                <Flex mt={3}>
                    <Button size="sm" colorScheme="blue" mr={2} onClick={onOpen}>
                        Expand
                    </Button>
                    <Button
                        size="sm"
                        colorScheme="green"
                        onClick={fetchGclassUrl}
                        isLoading={loadingGclass}
                        rightIcon={<ExternalLinkIcon />}
                    >
                        Google Classroom
                    </Button>
                </Flex>
            )}

            {/* Course Details Modal */}
            <Modal isOpen={isOpen} onClose={onClose} size="xl">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Course Details</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Course courseId={courseId} />
                    </ModalBody>
                </ModalContent>
            </Modal>
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
                const data = await CoursesAPI.get_courses();
                setCourses(data);
            } catch (error) {
                console.error("DEBUG: Error fetching courses:", error);
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
                    {courses.map((course: any, index: number) => (
                        <CourseCard
                            key={course._id?.$oid || course._id || index}
                            course={course}
                        />
                    ))}
                </Stack>
            )}
        </Flex>
    );
}