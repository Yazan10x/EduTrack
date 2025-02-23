"use client";

import React, { useEffect, useState } from "react";
import {
    Box,
    Text,
    Spinner,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Link,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { get_gclass_course_submissions } from "../../APIs/GClassAPI";
import { CoursesAPI } from "../../APIs/CoursesAPI";

// This is the ID of the course you want to fetch
const BASE_COURSE: string = "67bad928fb4fa5278425c3d9";

// Example Student interface
interface Student {
    _id: { $oid: string };
    first_name: string;
    last_name: string;
    username: string;
}

// Minimal shape of a single GClassStudentSubmission for our table
interface GClassStudentSubmission {
    gclassLink: string;
    assignedGrade: number;
    submissionState: string; // e.g. "STATES_CREATED", "STATES_TURNED_IN", ...
    workNotSubmittedAndLate: boolean;
    // add more fields if you need them, e.g. "title"
}

const GoogleClassroomHistory: React.FC<{ student: Student }> = ({ student }) => {
    const [submissions, setSubmissions] = useState<GClassStudentSubmission[]>([]);
    const [course, setCourse] = useState<any>(null);
    const [courseLoading, setCourseLoading] = useState(true);
    const [submissionsLoading, setSubmissionsLoading] = useState(true);

    useEffect(() => {
        // Fetch the course data
        const fetchCourse = async () => {
            try {
                const courseData = await CoursesAPI.get_course(BASE_COURSE);
                setCourse(courseData);
            } catch (error) {
                console.error("Error fetching course:", error);
            } finally {
                setCourseLoading(false);
            }
        };

        // Fetch the submissions
        const fetchSubmissions = async () => {
            try {
                const submissionsData = await get_gclass_course_submissions(
                    student._id.$oid,
                    BASE_COURSE
                );
                console.log("Submissions:", submissionsData);
                setSubmissions(submissionsData);
            } catch (error) {
                console.error("Error fetching submissions:", error);
            } finally {
                setSubmissionsLoading(false);
            }
        };

        fetchCourse();
        fetchSubmissions();
    }, [student]);

    // Helper function to map submission state + late flag into user-friendly text
    const getSubmissionStatus = (sub: GClassStudentSubmission) => {
        if (sub.workNotSubmittedAndLate) {
            return "Late";
        }
        switch (sub.submissionState) {
            case "STATES_CREATED":
                return "Not Submitted";
            case "STATES_TURNED_IN":
                return "Submitted";
            case "STATES_RETURNED":
                return "Returned";
            default:
                return sub.submissionState; // fallback
        }
    };

    return (
        <Box p={4} borderWidth="1px" borderRadius="lg" boxShadow="md">
            {/* Course Title or Loading */}
            {courseLoading ? (
                <Spinner size="md" color="blue.500" />
            ) : course ? (
                <Text fontSize="xl" fontWeight="bold" mb={2}>
                    Course: {course.name}
                </Text>
            ) : (
                <Text color="red.500">Course not found</Text>
            )}

            {/* Submissions Table or Loading */}
            {submissionsLoading ? (
                <Spinner size="md" color="green.500" />
            ) : submissions.length === 0 ? (
                <Text color="gray.500" mt={2}>
                    No submissions found
                </Text>
            ) : (
                <TableContainer mt={4}>
                    <Table variant="simple" size="md">
                        <Thead>
                            <Tr>
                                <Th>Name</Th>
                                <Th>Grade</Th>
                                <Th>Status</Th>
                                <Th>Link To Submission</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {submissions.map((submission, index) => (
                                <Tr key={index}>
                                    {/*
                    You could display submission title if you have it:
                      e.g. submission.title
                    For now, we'll just call it "Assignment #...".
                  */}
                                    <Td>Assignment #{index + 1}</Td>

                                    <Td>{submission.assignedGrade ?? "—"}</Td>

                                    <Td>{getSubmissionStatus(submission)}</Td>

                                    <Td>
                                        {submission.gclassLink ? (
                                            <Link
                                                href={submission.gclassLink}
                                                color="blue.500"
                                                isExternal
                                            >
                                                View
                                            </Link>
                                        ) : (
                                            "—"
                                        )}
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
            )}
        </Box>
    );
};

export default GoogleClassroomHistory;