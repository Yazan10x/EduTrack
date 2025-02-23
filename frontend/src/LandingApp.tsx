import * as React from 'react';
import { ChakraProvider, ColorModeScript, Spinner, Flex } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from './utils/firebase/authContext';
import PageNotFound from './screens/PageNotFound';
import theme from "./theme";
import LandingNavigation from "./LandingStaticSite/LandingNavigation";
import {LandingPage} from "./LandingStaticSite/LandingPage";
import Features from './LandingStaticSite/Features';
import Mission from './LandingStaticSite/Mission';
import Contact from './LandingStaticSite/Contact';


export const LandingApp = () => (
    <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<LandingNavigation />}>
                        {/* Publicly accessible routes */}
                        <Route index element={<LandingPage/>} />
                        <Route path="features" element={<Features />} />
                        <Route path="mission" element={<Mission />} />
                        <Route path="contact" element={<Contact />} />
                        <Route path="*" element={<PageNotFound />} />
                    </Route>
                </Routes>
            </Router>
        </AuthProvider>
    </ChakraProvider>
);

export default LandingApp;
