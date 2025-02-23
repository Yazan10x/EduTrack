import React from "react";
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react";
import { Navigate, NavLink, Route, Routes, useLocation } from "react-router-dom";
import { FlexWrap } from "./FlexWrap";

export interface TabRoute {
    label: string;
    path: string;
    element: React.ReactNode;
}

interface TabRoutesProps {
    tabs: TabRoute[];
    defaultTabIndex?: number;
    children?: React.ReactNode;
}

export const TabRoutes: React.FC<TabRoutesProps> = ({ tabs, defaultTabIndex = 0, children }) => {
    const location = useLocation();

    // Determine the active tab based on the current path
    const activeIndex = tabs.findIndex(tab => location.pathname.includes(tab.path)) ?? defaultTabIndex;

    return (
        <>
        <Tabs index={activeIndex} isLazy>
            <FlexWrap w={'%100'}>
                <TabList color={"blue.600"} flexGrow={1}>
                    {tabs.map((tab, index) => (
                        <Tab key={index} as={NavLink} to={tab.path}>
                            {tab.label}
                        </Tab>
                    ))}
                </TabList>

                {children}
            </FlexWrap>

            <TabPanels>
                {tabs.map((tab, index) => (
                    <TabPanel key={index}>
                        {tab.element}
                    </TabPanel>
                ))}
            </TabPanels>
        </Tabs>

        <Routes>
            <Route path="/" element={<Navigate to={tabs[defaultTabIndex].path} />} />
        </Routes>
        </>
    );
};
