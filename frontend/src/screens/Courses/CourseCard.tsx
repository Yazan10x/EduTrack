import React, { useEffect, useState } from 'react';
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Heading,
    Text,
    Badge,
    Button,
    HStack,
    Spacer,
    Image,
    useColorModeValue,
    Icon
} from '@chakra-ui/react';
import {FaChalkboard, FaChalkboardTeacher} from 'react-icons/fa';
import { CoursesAPI } from "../../APIs/CoursesAPI";
import {Course as CourseModel} from "../../models/Models";

interface Teacher {
    _id: {$oid: string};
    first_name: string;
    last_name: string;
    email: string;
}

interface CourseCardProps {
    course: CourseModel;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
    const [teacherName, setTeacherName] = useState<string>("Loading...");

    const cardBg = useColorModeValue('white', 'gray.800');
    const headerBg = useColorModeValue('blue.300', 'secondary.500');
    const textColor = useColorModeValue('gray.700', 'gray.200');
    const buttonBg = useColorModeValue('primary.600', 'primary.500');
    const buttonHover = useColorModeValue('primary.700', 'primary.400');

    useEffect(() => {
        if (course.teacher_id) {
            CoursesAPI.get_teacher(course.teacher_id)
                .then((teacherData: Teacher) => {
                    setTeacherName(teacherData.first_name + " " + teacherData.last_name);
                })
                .catch(() => {
                    setTeacherName("Unknown");
                });
        }
    }, [course.teacher_id]);

    const openGoogleClassroom = async () => {
        if (course) {
            const url = await CoursesAPI.get_gclass_url(course._id.toString())
            window.open(url, "_blank");
        } else {
            alert("No Google Classroom URL found for this course.");
        }
    };

    const studentCount = course.student_ids?.length || 0;

    return (
        <Card bg={cardBg} boxShadow="lg" borderRadius="lg" overflow="hidden" w="full" p={4}>
            <CardHeader bg={headerBg} color="white" p={4} borderTopRadius="lg">
                <Heading size="md">{course.name || "Untitled Course"}</Heading>
            </CardHeader>
            <CardBody color={textColor} p={4}>
                <HStack spacing={3} align="center">
                    <Icon as={FaChalkboard} boxSize={5} color="primary.600" />
                    <Text fontWeight="semibold">Course Code:</Text>
                    <Text>{course.course_code}</Text>
                    <Spacer />
                    <Badge variant="subtle" colorScheme="green" px={3} py={1} borderRadius="full">
                        {studentCount} {studentCount === 1 ? 'Student' : 'Students'}
                    </Badge>
                </HStack>
                <HStack spacing={3} align="center">
                    <Icon as={FaChalkboardTeacher} boxSize={5} color="primary.600" />
                    <Text fontWeight="semibold">Teacher:</Text>
                    <Text>{teacherName}</Text>
                </HStack>
            </CardBody>
            <CardFooter justifyContent="flex-end" p={4}>
                <Button
                    bg={buttonBg}
                    _hover={{ bg: buttonHover }}
                    color="white"
                    onClick={openGoogleClassroom}
                    leftIcon={
                        <Image
                            src="https://fonts.gstatic.com/s/i/productlogos/classroom/v7/192px.svg"
                            alt="Google Classroom"
                            boxSize="1.5rem"
                        />
                    }
                >
                    Google Classroom
                </Button>
            </CardFooter>
        </Card>
    );
};

export default CourseCard;