"use client";

import React, { useEffect, useState } from "react";
import {
    Box,
    Text,
    Spinner,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { get_gclass_course_submissions } from "../../APIs/GClassAPI";
import { CoursesAPI } from "../../APIs/CoursesAPI";

const BASE_COURSE: string = "67bad928fb4fa5278425c3d9";

interface Student {
    _id: { $oid: string };
    first_name: string;
    last_name: string;
    username: string;
}

interface GradeHistory {
    gradeTimestamp?: string;
    maxPoints?: number;
    pointsEarned?: number;
}

interface StateHistoryData {
    state?: string;
    stateTimestamp?: string;
}

interface SubmissionHistory {
    gradeHistory?: GradeHistory;
    stateHistory?: StateHistoryData;
}

interface GClassStudentSubmission {
    submissionState: string;      // e.g., "STATES_CREATED", "STATES_RETURNED", etc.
    workNotSubmittedAndLate: boolean;
    assignedGrade: number;
    workType: string;             // e.g., "WORKTYPE_ASSIGNMENT"
    submissionHistory: SubmissionHistory[];
    // ... other fields we don't actually need to keep
}

const GoogleClassroomHistoryString: React.FC<{ student: Student }> = ({ student }) => {
    const [course, setCourse] = useState<any>(null);
    const [courseLoading, setCourseLoading] = useState(true);

    const [submissions, setSubmissions] = useState<GClassStudentSubmission[]>([]);
    const [submissionsLoading, setSubmissionsLoading] = useState(true);

    useEffect(() => {
        // 1) Fetch Course
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

        // 2) Fetch Submissions
        const fetchSubmissions = async () => {
            try {
                const rawSubmissions = await get_gclass_course_submissions(
                    student._id.$oid,
                    BASE_COURSE
                );

                // 3) Transform raw submissions to only keep what's relevant for LLM
                const relevantSubmissions = rawSubmissions.map((sub: any) => {
                    return {
                        submissionState: sub.submissionState,
                        workNotSubmittedAndLate: sub.workNotSubmittedAndLate,
                        assignedGrade: sub.assignedGrade,
                        workType: sub.workType,
                        submissionHistory: (sub.submissionHistory || []).map((h: any) => {
                            if (h.gradeHistory) {
                                return {
                                    gradeTimestamp: h.gradeHistory.gradeTimestamp,
                                    maxPoints: h.gradeHistory.maxPoints,
                                    pointsEarned: h.gradeHistory.pointsEarned,
                                };
                            } else if (h.stateHistory) {
                                return {
                                    state: h.stateHistory.state,
                                    stateTimestamp: h.stateHistory.stateTimestamp,
                                };
                            }
                            return {};
                        }),
                    };
                });

                setSubmissions(relevantSubmissions);
            } catch (error) {
                console.error("Error fetching submissions:", error);
            } finally {
                setSubmissionsLoading(false);
            }
        };

        fetchCourse();
        fetchSubmissions();
    }, [student]);

    return (
        <Box p={4} borderWidth="1px" borderRadius="lg" boxShadow="md">
            {/* Course Title or Loading */}
            {courseLoading ? (
                <Spinner size="md" color="blue.500" />
            ) : course ? (
                <Text fontSize="xl" fontWeight="bold" mb={4}>
                    Course: {course.name}
                </Text>
            ) : (
                <Text color="red.500">Course not found</Text>
            )}

            {/* Show the relevant submissions as a JSON string */}
            {submissionsLoading ? (
                <Spinner size="md" color="green.500" />
            ) : submissions.length === 0 ? (
                <Text color="gray.500" mt={2}>
                    No submissions found
                </Text>
            ) : (
                <Box>
                    <Text fontSize="lg" fontWeight="semibold" mb={2}>
                        Submissions (LLM-Ready):
                    </Text>
                    <Text
                        fontSize="sm"
                        whiteSpace="pre-wrap"
                        bg="gray.100"
                        p={3}
                        borderRadius="md"
                    >
                        {JSON.stringify(submissions, null, 2)}
                    </Text>
                </Box>
            )}
        </Box>
    );
};

export default GoogleClassroomHistoryString;