import React, { useEffect, useState } from 'react';
import {
    Box,
    Center,
    VStack,
    Text,
    Heading,
    Flex,
    Image,
    useColorModeValue,
    FormControl,
    FormLabel,
    Input,
} from '@chakra-ui/react';
import {
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    sendPasswordResetEmail,
} from 'firebase/auth';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { auth } from '../../utils/firebase/firebaseConfig';
import { FcGoogle } from 'react-icons/fc';
import { UsersAPI } from '../../APIs/UsersAPI';
import { useAuth } from '../../utils/firebase/authContext';
import { FirebaseError } from 'firebase/app';
import Button from '../../ui/button/Button';

const AuthScreen = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const location = useLocation();
    const isLogin = location.pathname === '/login';

    const bgImage = useColorModeValue(
        "url('/images/education_light.png')",
        "url('/images/education_dark.png')",
    );

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [useEmail, setUseEmail] = useState(false);
    const [passwordError, setPasswordError] = useState('');
    const [passwordMatchError, setPasswordMatchError] = useState('');
    const [isForgotPassword, setIsForgotPassword] = useState(false);

    useEffect(() => {
        if (user) {
            navigate('/dashboard'); // Redirect to education dashboard
        }
    }, [user, navigate]);

    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            const full_name = user.displayName ?? undefined;
            const email = user.email ?? undefined;
            const photo_url = user.photoURL ?? undefined;

            let dbUser;
            try {
                dbUser = await UsersAPI.get_self();
            } catch (error) {
                console.log('Student profile not found, creating a new one...');
            }

            if (dbUser) {
                navigate('/dashboard');
            } else {
                const res = await UsersAPI.create_user({
                    full_name,
                    email,
                    photo_url,
                });

                if (res) {
                    navigate('/dashboard');
                    window.location.reload();
                }
            }
        } catch (error) {
            console.error('Failed to login:', error);
        }
    };

    const validatePasswordStrength = (password: string) => {
        const strongPasswordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
        return strongPasswordRegex.test(password);
    };

    const handleEmailSignUp = async () => {
        if (password !== confirmPassword) {
            setPasswordMatchError('Passwords do not match.');
            return;
        } else {
            setPasswordMatchError('');
        }

        if (!validatePasswordStrength(password)) {
            setPasswordError(
                'Password must be at least 8 characters long and include both letters and numbers.',
            );
            return;
        } else {
            setPasswordError('');
        }

        try {
            const result = await createUserWithEmailAndPassword(auth, email, password);
            const user = result.user;

            await updateProfile(user, { displayName: fullName });

            const res = await UsersAPI.create_user({
                full_name: fullName,
                email: user.email ?? undefined,
                photo_url: undefined,
            });

            if (res) {
                navigate('/dashboard');
                window.location.reload();
            }
        } catch (error) {
            const firebaseError = error as FirebaseError;
            if (firebaseError.code === 'auth/email-already-in-use') {
                // Handle email already in use
            } else {
                // Handle other errors
            }
            console.error('Failed to sign up:', firebaseError);
        }
    };

    const handleEmailLogin = async () => {
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            const user = result.user;

            let dbUser;
            try {
                dbUser = await UsersAPI.get_self();
            } catch (error) {
                console.log('Student profile not found in database, creating new profile...');
            }

            if (dbUser) {
                navigate('/dashboard');
            } else {
                const res = await UsersAPI.create_user({
                    full_name: user.displayName ?? undefined,
                    email: user.email!,
                    photo_url: undefined,
                });

                if (res) {
                    navigate('/dashboard');
                    window.location.reload();
                }
            }
        } catch (error) {
            console.error('Failed to login:', error);
        }
    };

    return (
        <Box position="relative" height="100vh">
            {/* Blurred Background */}
            <Box
                position="absolute"
                top={0}
                left={0}
                width="100%"
                height="100%"
                bgImage={bgImage}
                bgSize="cover"
                bgPosition="center"
                filter="blur(2px)"
                zIndex={-1}
            />

            {/* Login Content */}
            <Center height="100%">
                <Box
                    p={8}
                    minW="400px"
                    minH="500px"
                    maxWidth="md"
                    borderWidth={1}
                    borderRadius="lg"
                    boxShadow="lg"
                    bg="background"
                    _dark={{ bg: 'dark.background' }}
                >
                    <VStack spacing={4}>
                        <Box>
                            <Image
                                src="/logo1.png"
                                boxSize="80px"
                                mx="auto"
                                borderRadius="full"
                                alt="EduTrack Logo"
                            />
                        </Box>

                        {!useEmail && !isForgotPassword && (
                            <AuthOptions
                                isLogin={isLogin}
                                handleGoogleLogin={handleGoogleLogin}
                                setUseEmail={setUseEmail}
                            />
                        )}

                        {useEmail && !isForgotPassword && (
                            <EmailAuthForm
                                isLogin={isLogin}
                                email={email}
                                setEmail={setEmail}
                                password={password}
                                setPassword={setPassword}
                                fullName={fullName}
                                setFullName={setFullName}
                                confirmPassword={confirmPassword}
                                setConfirmPassword={setConfirmPassword}
                                passwordError={passwordError}
                                passwordMatchError={passwordMatchError}
                                handleEmailLogin={handleEmailLogin}
                                handleEmailSignUp={handleEmailSignUp}
                                setUseEmail={setUseEmail}
                                onForgotPassword={() => setIsForgotPassword(true)}
                            />
                        )}

                        {isForgotPassword && (
                            <ForgotPasswordForm
                                email={email}
                                setEmail={setEmail}
                                setIsForgotPassword={setIsForgotPassword}
                            />
                        )}

                        {!isForgotPassword && (
                            <>
                                <Link to={isLogin ? '/signup' : '/login'}>
                                    <Text color="blue.500">
                                        {isLogin
                                            ? "Don't have an account?"
                                            : 'Already have an account?'}
                                    </Text>
                                </Link>
                                <Text fontSize="md" color="text">
                                    {isLogin
                                        ? 'Login to access your courses and track your progress!'
                                        : 'Create an account to start your learning journey!'}
                                </Text>
                            </>
                        )}
                    </VStack>
                </Box>
            </Center>
        </Box>
    );
};

export default AuthScreen;

// Components defined within the same file

interface AuthOptionsProps {
    isLogin: boolean;
    handleGoogleLogin: () => void;
    setUseEmail: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthOptions: React.FC<AuthOptionsProps> = ({
                                                     isLogin,
                                                     handleGoogleLogin,
                                                     setUseEmail,
                                                 }) => (
    <>
        <Heading as="h1" size="2xl" color="text" textAlign="center">
            EduTrack
        </Heading>
        <Text fontSize="lg" fontWeight="bold" color="text" textAlign="center">
            Welcome to the EduTrack {isLogin ? 'Login' : 'Signup'} Portal
        </Text>
        <Text fontSize="md" color="text" textAlign="center">
            Your partner for academic success and personalized learning.
        </Text>

        <Button
            onClick={handleGoogleLogin}
            width="full"
            rightIcon={<FcGoogle />}
            variant="secondary"
        >
            {isLogin ? 'Login with Google' : 'Signup with Google'}
        </Button>
        <Button
            onClick={() => setUseEmail(true)}
            width="full"
            variant="primary"
            withRightArrow
        >
            Use Email
        </Button>
    </>
);

interface EmailAuthFormProps {
    isLogin: boolean;
    email: string;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    password: string;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
    fullName: string;
    setFullName: React.Dispatch<React.SetStateAction<string>>;
    confirmPassword: string;
    setConfirmPassword: React.Dispatch<React.SetStateAction<string>>;
    passwordError: string;
    passwordMatchError: string;
    handleEmailLogin: () => Promise<void>;
    handleEmailSignUp: () => Promise<void>;
    setUseEmail: React.Dispatch<React.SetStateAction<boolean>>;
    onForgotPassword: () => void;
}

const EmailAuthForm: React.FC<EmailAuthFormProps> = ({
                                                         isLogin,
                                                         email,
                                                         setEmail,
                                                         password,
                                                         setPassword,
                                                         fullName,
                                                         setFullName,
                                                         confirmPassword,
                                                         setConfirmPassword,
                                                         passwordError,
                                                         passwordMatchError,
                                                         handleEmailLogin,
                                                         handleEmailSignUp,
                                                         setUseEmail,
                                                         onForgotPassword,
                                                     }) => (
    <>
        <Heading as="h2" size="lg" color="text" textAlign="center">
            {isLogin ? 'Login with Email' : 'Sign Up with Email'}
        </Heading>
        <VStack spacing={4} width="100%">
            {!isLogin && (
                <FormControl id="fullName" isRequired>
                    <FormLabel>Full Name</FormLabel>
                    <Input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                    />
                </FormControl>
            )}
            <FormControl id="email" isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </FormControl>
            <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </FormControl>
            {!isLogin && (
                <FormControl id="confirmPassword" isRequired>
                    <FormLabel>Confirm Password</FormLabel>
                    <Input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </FormControl>
            )}
            {passwordError && <Text color="red.500">{passwordError}</Text>}
            {passwordMatchError && (
                <Text color="red.500">{passwordMatchError}</Text>
            )}
            {isLogin && (
                <Button variant="link" colorScheme="blue" onClick={onForgotPassword}>
                    Forgot Password?
                </Button>
            )}
            <Button
                onClick={isLogin ? handleEmailLogin : handleEmailSignUp}
                width="full"
                variant="primary"
                withRightArrow
            >
                {isLogin ? 'Login' : 'Sign Up'}
            </Button>
            <Button
                onClick={() => setUseEmail(false)}
                width="full"
                variant="outline"
                withLeftArrow
            >
                Back
            </Button>
        </VStack>
    </>
);

interface ForgotPasswordFormProps {
    email: string;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    setIsForgotPassword: React.Dispatch<React.SetStateAction<boolean>>;
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
                                                                   email,
                                                                   setEmail,
                                                                   setIsForgotPassword,
                                                               }) => {
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handlePasswordReset = async () => {
        try {
            await sendPasswordResetEmail(auth, email);
            setMessage('Password reset email sent.');
            setError('');
        } catch (error) {
            setError('Error sending password reset email.');
            console.error('Error sending password reset email:', error);
        }
    };

    return (
        <>
            <Heading as="h2" size="lg" color="text" textAlign="center">
                Forgot Password
            </Heading>
            <VStack spacing={4} width="100%">
                <FormControl id="email" isRequired>
                    <FormLabel>Email</FormLabel>
                    <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </FormControl>
                {message && <Text color="green.500">{message}</Text>}
                {error && <Text color="red.500">{error}</Text>}
                <Button
                    onClick={handlePasswordReset}
                    width="full"
                    variant="primary"
                    withRightArrow
                >
                    Reset Password
                </Button>
                <Button
                    onClick={() => setIsForgotPassword(false)}
                    width="full"
                    variant="outline"
                    withLeftArrow
                >
                    Back
                </Button>
            </VStack>
        </>
    );
};