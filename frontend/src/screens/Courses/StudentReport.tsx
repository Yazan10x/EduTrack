import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    Box,
    Spinner,
    Heading,
    Text,
    Avatar,
    Stack,
    Badge,
    HStack,
    VStack,
    Card,
    CardHeader,
    CardBody,
    Icon,
    useColorModeValue, Spacer,
} from "@chakra-ui/react";
import { FaClipboardList } from "react-icons/fa";
import { CoursesAPI } from "../../APIs/CoursesAPI";
import GoogleClassroomHistory from "./GoogleClassroomHistory";
import GoogleClassroomHistoryString from "./GoogleClassroomHistoryString";

interface Student {
    _id: { $oid: string };
    first_name: string;
    last_name: string;
    username: string;
}

const StudentReport: React.FC = () => {
    const { studentId } = useParams();
    const [student, setStudent] = useState<Student | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!studentId) return;

        const fetchStudent = async () => {
            try {
                const data = await CoursesAPI.get_student(studentId);
                setStudent(data);
            } catch (error) {
                console.error("Error fetching student:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStudent();
    }, [studentId]);

    if (loading) {
        return (
            <Box w="100%" h="100vh" display="flex" alignItems="center" justifyContent="center">
                <Spinner size="xl" />
            </Box>
        );
    }

    if (!student) {
        return (
            <Heading size="md" color="red.500" textAlign="center" mt={8}>
                No student data found
            </Heading>
        );
    }

    return (
        <Box position="relative" p={6} minH="100vh">
            <HStack align="flex-start" spacing={8}>
                {/* Student Profile Card */}
                <Box
                    maxW={"320px"}
                    w={"320px"}
                    bg={"white"}
                    boxShadow={"2xl"}
                    rounded={"lg"}
                    p={6}
                    textAlign={"center"}
                >
                    <Avatar
                        size={"xl"}
                        name={`${student.first_name} ${student.last_name}`}
                        mb={4}
                        pos={"relative"}
                        _after={{
                            content: '""',
                            w: 4,
                            h: 4,
                            bg: "green.300",
                            border: "2px solid white",
                            rounded: "full",
                            pos: "absolute",
                            bottom: 0,
                            right: 3,
                        }}
                    />
                    <Heading fontSize={"2xl"} fontFamily={"body"}>
                        {student.first_name} {student.last_name}
                    </Heading>
                    <Text fontWeight={600} color={"gray.500"} mb={4}>
                        @{student.username}
                    </Text>

                    <Stack align={"center"} justify={"center"} direction={"row"} mt={6}>
                        <Badge px={2} py={1} bg={"gray.50"} fontWeight={"400"}>
                            #student
                        </Badge>
                    </Stack>
                </Box>

                {/* Submission History Section */}
                <Card w="full" bg={"gray.50"} boxShadow="md">
                    <CardHeader borderBottomWidth="1px" pb={2} display="flex" alignItems="center">
                        <Icon as={FaClipboardList} boxSize={6} mr={3} color="blue.500" />
                        <Heading as="h2" size="lg">
                            Submission History
                        </Heading>
                    </CardHeader>
                    <CardBody>
                        <VStack align="start" spacing={3}>
                            <Text fontSize="md" color="gray.600">
                                The student’s submission history is collected from Google Classroom assignments and quizzes.
                            </Text>
                            <Text fontSize="sm" color="gray.500">
                                Details about individual submissions, grades, and feedback will be displayed here.
                            </Text>
                        </VStack>
                    </CardBody>
                </Card>
            </HStack>
            <Spacer h={10}/>
            <GoogleClassroomHistory student={student}/>
            <Spacer h={10}/>
            <GoogleClassroomHistoryString student={student}/>
        </Box>
    );
};

export default StudentReport;