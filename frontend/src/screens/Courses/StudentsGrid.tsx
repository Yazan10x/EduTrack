import React, { useEffect, useState } from "react";
import {
    Flex,
    Spinner,
    Box,
    SimpleGrid,
} from "@chakra-ui/react";
import { CoursesAPI } from "../../APIs/CoursesAPI";
import StudentCard from "./StudentCard";

interface CourseProps {
    courseId: string;
}

interface Student {
    _id: { $oid: string };
    first_name: string;
    last_name: string;
    username: string;
}

const StudentsGrid: React.FC<CourseProps> = ({ courseId }) => {
    const [loading, setLoading] = useState(true);
    const [course, setCourse] = useState<any | null>(null);
    const [students, setStudents] = useState<Student[]>([]);

    useEffect(() => {
        const fetchCourseAndStudents = async () => {
            try {
                // 1) Fetch the course details
                const courseData = await CoursesAPI.get_course(courseId);
                setCourse(courseData);

                // 2) If we have student_ids, fetch them
                const studentIds: string[] = courseData?.student_ids || [];
                if (studentIds.length > 0) {
                    const studentPromises = studentIds.map((id) =>
                        CoursesAPI.get_student(id)
                    );
                    const studentData = await Promise.all(studentPromises);
                    setStudents(studentData);
                }
            } catch (error) {
                console.error("DEBUG: Error fetching course/students:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCourseAndStudents();
    }, [courseId]);

    if (loading) {
        return (
            <Flex justify="center" align="center" height="100vh">
                <Spinner size="xl" />
            </Flex>
        );
    }

    return (
        <Box p={8}>
            {/* Display course title (optional) */}
            {/* 3) Display students in a responsive grid */}
            <SimpleGrid
                columns={[1, 2]}
                spacing={6}
                alignItems="stretch"  // Ensures each grid cell stretches
            >
                {students.map((student) => (
                    <Box key={student._id.$oid} h="100%">
                        <StudentCard student={student} />
                    </Box>
                ))}
            </SimpleGrid>
        </Box>
    );
};

export default StudentsGrid;
