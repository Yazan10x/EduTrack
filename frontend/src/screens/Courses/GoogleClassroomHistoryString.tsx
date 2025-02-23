"use client";

import React, { useEffect, useState } from "react";
import {
    Box,
    Text,
    Spinner,
    Button,
    useToast,
    VStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { get_gclass_course_submissions } from "../../APIs/GClassAPI";
import { CoursesAPI } from "../../APIs/CoursesAPI";
import {UsersAPI} from "../../APIs/UsersAPI";

// Constants / interfaces
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
    submissionState: string;
    workNotSubmittedAndLate: boolean;
    assignedGrade: number;
    workType: string;
    submissionHistory: SubmissionHistory[];
}

const GoogleClassroomHistoryForString: React.FC<{ student: Student }> = ({ student }) => {
    const toast = useToast();

    // Course / submissions
    const [course, setCourse] = useState<any>(null);
    const [courseLoading, setCourseLoading] = useState(true);

    const [submissions, setSubmissions] = useState<GClassStudentSubmission[]>([]);
    const [submissionsLoading, setSubmissionsLoading] = useState(true);

    // AI report
    const [aiLoading, setAiLoading] = useState(false);
    const [aiReport, setAiReport] = useState<string>("");

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

                // 3) Keep only what's relevant for LLM
                const relevantSubmissions: GClassStudentSubmission[] = rawSubmissions.map(
                    (sub: any) => ({
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
                    })
                );

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

    // 4) Handle "Generate AI Report" click
    const handleGenerateReport = async () => {
        try {
            setAiLoading(true);
            setAiReport("");

            // Turn submissions into JSON string as the "prompt"
            const prompt = JSON.stringify(submissions, null, 2);

            // This calls your hypothetical endpoint that returns the AI response
            const response: string = await UsersAPI.get_gemini(prompt);

            setAiReport(response);
        } catch (error: any) {
            console.error("Error generating AI report:", error);
            toast({
                title: "Error generating AI report",
                description: error?.message || "Unknown error",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        } finally {
            setAiLoading(false);
        }
    };

    return (
        <Box p={6} borderWidth="1px" borderRadius="lg" boxShadow="md" bg="teal.50">
            {courseLoading ? (
                <Spinner size="md" color="blue.500" />
            ) : course ? (
                <Text fontSize="xl" fontWeight="bold" mb={4}>
                    Course: {course.name}
                </Text>
            ) : (
                <Text color="red.500">Course not found</Text>
            )}

            {submissionsLoading ? (
                <Spinner size="md" color="green.500" />
            ) : (
                <VStack align="start" spacing={4}>
                    <Button
                        colorScheme="blue"
                        onClick={handleGenerateReport}
                        isLoading={aiLoading}
                        loadingText="Generating..."
                    >
                        Generate AI Report
                    </Button>

                    {aiReport && (
                        <Box
                            w="100%"
                            p={4}
                            bg="white"
                            borderRadius="md"
                            borderWidth="1px"
                            boxShadow="sm"
                        >
                            <Text fontSize="md" whiteSpace="pre-wrap">
                                {aiReport}
                            </Text>
                        </Box>
                    )}
                </VStack>
            )}
        </Box>
    );
};

export default GoogleClassroomHistoryForString;