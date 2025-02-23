import * as React from 'react';
import { ChakraProvider, ColorModeScript, Spinner, Flex } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from 'react-router-dom';
import Settings from './screens/Settings';
import SidebarWithHeader from './components/SidebarWithHeader';
import { AuthProvider, useAuth } from './utils/firebase/authContext';
import Dashboard from "./screens/Dashboard";
import PageNotFound from './screens/PageNotFound';
import theme from "./theme";
import ProfileScreen from "./screens/User/ProfileScreen";
import AuthScreen from "./screens/Auth/AuthScreen";
import AdminPortal from "./screens/Admin/AdminPortal";
import Courses from "./screens/Courses/Courses";
import StudentReport from "./screens/Courses/StudentReport";


const PrivateRoute = ({ children }: { children: JSX.Element }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <Flex justify="center" align="center" height="100vh" bg="background">
                <Spinner size="xl" color="primary" />
            </Flex>
        );
    }

    return user ? children : <Navigate to="/login" />;
};

const AdminRoute = ({ children }: { children: JSX.Element }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <Flex justify="center" align="center" height="100vh" bg="background">
                <Spinner size="xl" color="primary" />
            </Flex>
        );
    }

    // Check if user exists and is an admin
    if (user && user.is_admin()) {
        return children;
    } else {
        return <Navigate to="/login" />;
    }
};

// Redirect to coming-soon page if user is not authenticated
const RedirectIfLoggedIn = ({ children }: { children: JSX.Element }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <Flex justify="center" align="center" height="100vh" bg="background">
                <Spinner size="xl" color="primary" />
            </Flex>
        );
    }

    return user ? <Navigate to="/" /> : children;
};

const ProtectedLayout = () => (
    <SidebarWithHeader>
        <Outlet />
    </SidebarWithHeader>
);

export const App = () => (
    <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <AuthProvider>
            <Router>
                <Routes>
                    {/* Publicly accessible routes */}

                    {/* Restrict access to login/signup if already logged in */}
                    <Route path="/login" element={<RedirectIfLoggedIn><AuthScreen /></RedirectIfLoggedIn>} />
                    <Route path="/signup" element={<RedirectIfLoggedIn><AuthScreen /></RedirectIfLoggedIn>} />

                    {/* Protected routes for logged-in users */}
                    <Route path="/" element={<PrivateRoute><ProtectedLayout /></PrivateRoute>}>
                        <Route index element={<Dashboard />} />
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="courses" element={<Courses/>} />
                        <Route path="student_report/:studentId" element={<StudentReport/>} />

                        {/* Protected Admin Pages */}
                        <Route path="_admin/*" element={
                            <AdminRoute>
                                <AdminPortal />
                            </AdminRoute>
                        } />
                        {/*User Pages*/}
                        <Route path="settings" element={<Settings />} />
                        <Route path="profile" element={<ProfileScreen />} />

                    </Route>

                    {/* Fallback for unknown routes */}
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </Router>
        </AuthProvider>
    </ChakraProvider>
);

export default App;
