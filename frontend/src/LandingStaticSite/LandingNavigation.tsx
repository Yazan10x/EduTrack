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
    useDisclosure,
    Spacer,
} from '@chakra-ui/react'
import {
    HamburgerIcon,
    CloseIcon,
    ChevronDownIcon,
    ChevronRightIcon,
} from '@chakra-ui/icons'
import { Outlet } from "react-router-dom"
import React from "react"
import Footer from "../components/Footer"
import ProjectLogo from "../components/ProjectLogo"
import Button from "../ui/button/Button"

export default function LandingNavigation() {
    const { isOpen, onToggle } = useDisclosure()

    return (
        <Box minH="100vh" display="flex" flexDirection="column">
            <Box
                position="sticky"
                top={0}
                zIndex={1000}
                boxShadow="0 2px 10px rgba(0,0,0,0.08)"
                bg={useColorModeValue('rgba(255,255,255,0.9)', 'rgba(26,32,44,0.9)')}
                backdropFilter="blur(10px)"
                transition="all 0.3s ease"
            >
                <Flex
                    maxW="7xl"
                    mx="auto"
                    color={useColorModeValue('text', 'text')}
                    minH="70px"
                    py={{ base: 3 }}
                    px={{ base: 4 }}
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
                            _hover={{
                                bg: useColorModeValue('gray.100', 'gray.700'),
                                transform: 'scale(1.05)'
                            }}
                            transition="all 0.2s"
                        />
                    </Flex>

                    <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
                        <Box
                            transition="transform 0.2s"
                            _hover={{ transform: 'scale(1.05)' }}
                            as='a'
                            href="/"
                        >
                            <ProjectLogo />
                        </Box>
                        <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
                            <DesktopNav />
                        </Flex>
                    </Flex>

                    <Stack
                        flex={{ base: 1, md: 0 }}
                        justify="flex-end"
                        direction="row"
                        spacing={6}
                        display={{ base: 'none', md: 'flex' }}
                    >
                        <Button
                            variant="primary"
                            withRightArrow
                            onClick={() => window.open(process.env.REACT_APP_DASHBOARD_SITE_ADDRESS, '_blank')}
                            _hover={{
                                transform: 'translateY(-2px)',
                                boxShadow: 'lg'
                            }}
                            transition="all 0.2s"
                        >
                            Dashboard
                        </Button>
                    </Stack>

                    <Stack
                        flex={{ base: 1, md: 0 }}
                        justify="flex-end"
                        direction="row"
                        spacing={6}
                        display={{ base: 'flex', md: 'none' }}
                    >
                        <Spacer />
                    </Stack>
                </Flex>

                <Collapse in={isOpen} animateOpacity>
                    <MobileNav />
                </Collapse>
            </Box>

            <Box p={4} flex="1">
                <Outlet />
            </Box>

            <Box>
                <Footer />
            </Box>
        </Box>
    )
}

const DesktopNav = () => {
    const colors = {
        link: useColorModeValue('gray.600', 'gray.200'),
        linkHover: useColorModeValue('gray.800', 'white'),
        popoverBg: useColorModeValue('white', 'gray.800'),
        ghostBg: useColorModeValue('gray.50', 'gray.700'),
    };

    return (
        <Stack 
            direction={'row'} 
            spacing={8} 
            align="center" 
        >
            {NAV_ITEMS.map((navItem) => (
                <Box key={navItem.label}>
                    <Popover trigger={'hover'} placement={'bottom-start'}>
                        <PopoverTrigger>
                            <Box
                                as="a"
                                p={4} 
                                href={navItem.href ?? '#'}
                                fontSize="lg" 
                                fontWeight={600} 
                                letterSpacing="wide" 
                                color={colors.link}
                                position="relative"
                                borderRadius="md"
                                transition="all 0.3s ease"
                                _hover={{
                                    textDecoration: 'none',
                                    color: colors.linkHover,
                                    bg: colors.ghostBg,
                                    transform: 'translateY(-2px)',
                                }}
                                _after={{
                                    content: '""',
                                    position: 'absolute',
                                    bottom: '0',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    width: '0%',
                                    height: '2px',
                                    bg: 'primary.500',
                                    transition: 'all 0.3s ease',
                                }}
                                sx={{
                                    '&:hover': {
                                        '&:after': {
                                            width: '80%'
                                        }
                                    }
                                }}
                            >
                                {navItem.label}
                            </Box>
                        </PopoverTrigger>

                        {navItem.children && (
                            <PopoverContent
                                border={0}
                                boxShadow={'xl'}
                                bg={colors.popoverBg}
                                p={4}
                                rounded={'xl'}
                                minW={'sm'}
                                mt={2}
                                _after={{
                                    content: '""',
                                    position: 'absolute',
                                    top: '-15px',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    borderStyle: 'solid',
                                    borderColor: colors.popoverBg,
                                    borderWidth: '15px',
                                }}
                                _hover={{
                                    transform: 'translateY(2px)',
                                }}
                            >
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
    const hoverBg = useColorModeValue('gray.50', 'gray.700')
    
    return (
        <Box
            as="a"
            href={href}
            role={'group'}
            display={'block'}
            p={3}
            rounded={'md'}
            transition="all 0.2s ease"
            _hover={{ 
                bg: hoverBg,
                transform: 'translateX(5px)'
            }}
        >
            <Stack direction={'row'} align={'center'}>
                <Box>
                    <Text
                        transition={'all .3s ease'}
                        _groupHover={{ color: 'primary.500' }}
                        fontWeight={500}
                    >
                        {label}
                    </Text>
                    <Text 
                        fontSize={'sm'} 
                        color={useColorModeValue('gray.500', 'gray.400')}
                    >
                        {subLabel}
                    </Text>
                </Box>
                <Flex
                    transition={'all .3s ease'}
                    transform={'translateX(-10px)'}
                    opacity={0}
                    _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
                    justify={'flex-end'}
                    align={'center'}
                    flex={1}
                >
                    <Icon color={'primary.500'} w={5} h={5} as={ChevronRightIcon} />
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
    {
        label: 'Contact',
        href: '/contact',
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