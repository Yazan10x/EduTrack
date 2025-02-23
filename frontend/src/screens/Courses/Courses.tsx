import React, {useEffect, useState} from "react";
import {
    Flex,
    Heading,
    Spinner,
    Stack,
    useDisclosure,
} from "@chakra-ui/react";
import { CoursesAPI } from "../../APIs/CoursesAPI";
import CreateCourseDialog from "./CreateCourseDialog";
import CourseCard from "./CourseCard";
import Button from "../../ui/button/Button";

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
                <Button bg="black" onClick={onOpen} withRightArrow>
                    Create Class
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