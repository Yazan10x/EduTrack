import React, { useState } from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Input,
    FormControl,
    FormLabel
} from "@chakra-ui/react";
import { CoursesAPI } from "../../APIs/CoursesAPI";

interface CreateCourseDialogProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function CreateCourseDialog({ isOpen, onClose }: CreateCourseDialogProps) {
    const [name, setName] = useState("");
    const [courseCode, setCourseCode] = useState("");
    const [teacherEmail, setTeacherEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleCreateCourse = async () => {
        if (!name || !courseCode || !teacherEmail) {
            alert("Please fill in all fields");
            return;
        }

        setLoading(true);
        try {
            await CoursesAPI.create_class({
                name,
                course_code: courseCode,
                teacher_email: teacherEmail,
            });
            alert("Course created successfully!");
            onClose();
        } catch (error) {
            alert("Failed to create course");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Create a New Course</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl mb={4}>
                        <FormLabel>Course Name</FormLabel>
                        <Input
                            placeholder="Enter course name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            disabled={loading}
                        />
                    </FormControl>

                    <FormControl mb={4}>
                        <FormLabel>Course Code</FormLabel>
                        <Input
                            placeholder="Enter course code"
                            value={courseCode}
                            onChange={(e) => setCourseCode(e.target.value)}
                            disabled={loading}
                        />
                    </FormControl>

                    <FormControl>
                        <FormLabel>Teacher Email</FormLabel>
                        <Input
                            placeholder="Enter teacher email"
                            type="email"
                            value={teacherEmail}
                            onChange={(e) => setTeacherEmail(e.target.value)}
                            disabled={loading}
                        />
                    </FormControl>
                </ModalBody>
                <ModalFooter>
                    <Button variant="ghost" onClick={onClose} mr={3} disabled={loading}>
                        Cancel
                    </Button>
                    <Button colorScheme="blue" onClick={handleCreateCourse} isLoading={loading}>
                        Create
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}