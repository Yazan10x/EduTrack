'use client'

import {
    Box,
    Flex,
    Text,
    IconButton,
    Stack,
    Collapse,
    Icon,
    Popover,
    PopoverTrigger,
    PopoverContent,
    useColorModeValue,
    useDisclosure, Spacer,
} from '@chakra-ui/react'
import {
    HamburgerIcon,
    CloseIcon,
    ChevronDownIcon,
    ChevronRightIcon,
} from '@chakra-ui/icons'
import {Outlet} from "react-router-dom";
import React from "react";
import Footer from "../components/Footer";
import ProjectLogo from "../components/ProjectLogo";
import Button from "../ui/button/Button";

export default function LandingNavigation() {
    const { isOpen, onToggle } = useDisclosure()

    return (
        // 1) Make this container take up full viewport height and use column flex layout
        <Box minH="100vh" display="flex" flexDirection="column">
            <Flex
                bg={useColorModeValue('background', 'background')} // Uses semantic token
                color={useColorModeValue('text', 'text')}           // Uses semantic token
                minH="60px"
                py={{ base: 2 }}
                px={{ base: 4 }}
                borderBottom={1}
                borderStyle="solid"
                borderColor={useColorModeValue('border', 'border')} // Uses semantic token
                align="center"
            >
                <Flex
                    flex={{ base: 1, md: 'auto' }}
                    ml={{ base: -2 }}
                    display={{ base: 'flex', md: 'none' }}
                >
                    <IconButton
                        onClick={onToggle}
                        icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
                        variant="ghost"
                        aria-label="Toggle Navigation"
                    />
                </Flex>

                <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
                    <ProjectLogo />
                    <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
                        <DesktopNav />
                    </Flex>
                </Flex>

                <Stack
                    flex={{ base: 1, md: 0 }}
                    justify="flex-end"
                    direction="row"
                    spacing={6}
                    display={{ base: 'none', md: 'flex' }} // Hide on mobile
                >
                    <Button
                        variant="primary"
                        withRightArrow
                        onClick={() => window.open(process.env.REACT_APP_DASHBOARD_SITE_ADDRESS, '_blank')}
                    >
                        Dashboard
                    </Button>
                </Stack>

                <Stack
                    flex={{ base: 1, md: 0 }}
                    justify="flex-end"
                    direction="row"
                    spacing={6}
                    display={{ base: 'flex', md: 'none' }} // Hide on mobile
                >
                    <Spacer />
                </Stack>
            </Flex>

            <Collapse in={isOpen} animateOpacity>
                <MobileNav />
            </Collapse>

            {/* 2) Let this main content area expand to push the footer down when content is short */}
            <Box p={4} flex="1">
                <Outlet />
            </Box>

            {/* Footer remains at bottom if content doesn't fill the page */}
            <Box>
                <Footer />
            </Box>
        </Box>
    )
}

const DesktopNav = () => {
    // Move hooks outside of any logic
    const colors = {
        link: useColorModeValue('primary.800', 'primary.200'),
        linkHover: useColorModeValue('primary.900', 'primary.50'),
        popoverBg: useColorModeValue('primary.50', 'primary.800'),
    };

    return (
        <Stack direction={'row'} spacing={4}>
            {NAV_ITEMS.map((navItem) => (
                <Box key={navItem.label}>
                    <Popover trigger={'hover'} placement={'bottom-start'}>
                        <PopoverTrigger>
                            <Box
                                as="a"
                                p={2}
                                href={navItem.href ?? '#'}
                                fontSize={'sm'}
                                fontWeight={500}
                                color={colors.link} // Use precomputed value
                                _hover={{
                                    textDecoration: 'none',
                                    color: colors.linkHover, // Use precomputed value
                                }}>
                                {navItem.label}
                            </Box>
                        </PopoverTrigger>

                        {navItem.children && (
                            <PopoverContent
                                border={0}
                                boxShadow={'xl'}
                                bg={colors.popoverBg} // Use precomputed value
                                p={4}
                                rounded={'xl'}
                                minW={'sm'}>
                                <Stack>
                                    {navItem.children.map((child) => (
                                        <DesktopSubNav key={child.label} {...child} />
                                    ))}
                                </Stack>
                            </PopoverContent>
                        )}
                    </Popover>
                </Box>
            ))}
        </Stack>
    )
}

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
    return (
        <Box
            as="a"
            href={href}
            role={'group'}
            display={'block'}
            p={2}
            rounded={'md'}
            _hover={{ bg: useColorModeValue('neutral.100', 'neutral.700') }}>
            <Stack direction={'row'} align={'center'}>
                <Box>
                    <Text
                        transition={'all .3s ease'}
                        _groupHover={{ color: 'primary' }}
                        fontWeight={500}>
                        {label}
                    </Text>
                    <Text fontSize={'sm'}>{subLabel}</Text>
                </Box>
                <Flex
                    transition={'all .3s ease'}
                    transform={'translateX(-10px)'}
                    opacity={0}
                    _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
                    justify={'flex-end'}
                    align={'center'}
                    flex={1}>
                    <Icon color={'primary'} w={5} h={5} as={ChevronRightIcon} />
                </Flex>
            </Stack>
        </Box>
    )
}

const MobileNav = () => {
    return (
        <Stack bg={useColorModeValue('background', 'background')} p={4} display={{ md: 'none' }}>
            {NAV_ITEMS.map((navItem) => (
                <MobileNavItem key={navItem.label} {...navItem} />
            ))}
        </Stack>
    )
}

const MobileNavItem = ({ label, children, href }: NavItem) => {
    const { isOpen, onToggle } = useDisclosure()

    return (
        <Stack spacing={4} onClick={children && onToggle}>
            <Box
                py={2}
                as="a"
                href={href ?? '#'}
                justifyContent="space-between"
                alignItems="center"
                _hover={{
                    textDecoration: 'none',
                }}>
                <Text fontWeight={600} color={useColorModeValue('primary.900', 'text')}>
                    {label}
                </Text>
                {children && (
                    <Icon
                        as={ChevronDownIcon}
                        transition={'all .25s ease-in-out'}
                        transform={isOpen ? 'rotate(180deg)' : ''}
                        w={6} h={6}
                    />
                )}
            </Box>

            <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
                <Stack
                    mt={2}
                    pl={4}
                    borderLeft={1}
                    borderStyle={'solid'}
                    borderColor={useColorModeValue('border', 'border')}
                    align={'start'}>
                    {children &&
                        children.map((child) => (
                            <Box as="a" key={child.label} py={2} href={child.href}>
                                {child.label}
                            </Box>
                        ))}
                </Stack>
            </Collapse>
        </Stack>
    )
}

interface NavItem {
    label: string
    subLabel?: string
    children?: Array<NavItem>
    href?: string
}

const NAV_ITEMS: Array<NavItem> = [
    {
        label: 'Home',
        href: '/',
    },
    {
        label: 'Features',
        href: '/features',
    },
    {
        label: 'Mission',
        href: '/mission',
    },
    // {
    //     label: 'About',
    //     href: '/about',
    // },
    // {
    //     label: 'Legal',
    //     children: [
    //         { label: 'Privacy Policy', subLabel: 'Learn how we protect your data', href: '/privacy' },
    //         { label: 'Legal Policy', subLabel: 'Understand our terms of service', href: '/legal' },
    //     ],
    // },
    // {
    //     label: 'About',
    //     children: [
    //         { label: 'Contact Us', subLabel: 'Reach out to us', href: '/contact-us' },
    //         { label: 'Status', subLabel: 'Check system status', href: '/status' },
    //     ],
    // },
];