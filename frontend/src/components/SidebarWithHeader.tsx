// src/components/SidebarWithHeader.tsx

import {
    IconButton,
    Avatar,
    Box,
    CloseButton,
    Flex,
    HStack,
    VStack,
    Icon,
    useColorModeValue,
    Text,
    Drawer,
    DrawerContent,
    useDisclosure,
    BoxProps,
    FlexProps,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    Image, Spacer,
} from "@chakra-ui/react";
import {
    FiHome,
    FiMenu,
    FiBell,
    FiChevronDown,
    FiList,
} from "react-icons/fi";
import { IconType } from "react-icons";
import { ColorModeSwitcher } from "../ColorModeSwitcher";
import { Link, useNavigate } from "react-router-dom";
import { ReactNode } from "react";
import {
    AiFillCarryOut,
    AiFillDashboard, AiFillGold, AiFillSecurityScan,
    AiFillVideoCamera,
    AiFillWallet, AiOutlineHistory,
    AiOutlineOrderedList,
    AiOutlineUnorderedList
} from "react-icons/ai";
import { BiPencil, BiVideo } from "react-icons/bi";
import { useAuth } from "../utils/firebase/authContext";
import Footer from "./Footer";
import {ObjectId} from "bson";

export const WEB_SITE_TITLE: string = "EduTrack";

interface LinkItemProps {
    name: string;
    icon: IconType;
    path: string;
}

interface NavItemProps extends FlexProps {
    icon: IconType;
    children: React.ReactNode;
    to: string;
    onClose?: () => void;
}

interface MobileProps extends FlexProps {
    onOpen: () => void;
}

interface SidebarProps extends BoxProps {
    onClose: () => void;
}

const LinkItems: Array<LinkItemProps> = [
    { name: "Dashboard", icon: AiFillDashboard, path: "/" },
    { name: "Courses", icon: AiOutlineOrderedList, path: "/courses" },
];

const AdminLinkItems: Array<LinkItemProps> = [
    { name: "Admin", icon: AiFillSecurityScan, path: "/_admin" },
];

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
    const { user } = useAuth();
    // Define colors using useColorModeValue
    const bgColor = useColorModeValue('background', 'background');
    const borderColor = useColorModeValue('primary.200', 'primary.700');
    const textColor = useColorModeValue('text', 'text');

    return (
        <Box
            transition="3s ease"
            bg={bgColor}
            borderRight="1px"
            borderRightColor={borderColor}
            w={{ base: "full", md: 60 }}
            pos="fixed"
            h="full"
            {...rest}
        >
            <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
                <Flex alignItems="center">
                    <Image
                        src="/logo1.png"
                        alt="Logo"
                        boxSize="30px"
                        ml={2}
                        marginRight={"5px"}
                        borderRadius="full"
                    />
                    <Text fontSize="xl" fontWeight="bold" color={"black"} fontFamily="Orbitron">
                        {WEB_SITE_TITLE}
                    </Text>
                </Flex>
                <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
            </Flex>
            {
                user?.is_admin()
                    ?
                    (LinkItems.concat(AdminLinkItems)).map((link) => (
                        <NavItem key={link.name} icon={link.icon} to={link.path} onClose={onClose}>
                            {link.name}
                        </NavItem>
                    ))
                    :
                    LinkItems.map((link) => (
                        <NavItem key={link.name} icon={link.icon} to={link.path} onClose={onClose}>
                            {link.name}
                        </NavItem>
                    ))
            }
        </Box>
    );
};

const NavItem = ({ icon, children, to, onClose, ...rest }: NavItemProps) => {
    // Define colors using useColorModeValue
    const hoverBgColor = useColorModeValue('primary.100', 'primary.600');
    const iconColor = useColorModeValue('primary.900', 'primary.500');
    const textColor = useColorModeValue('text', 'text');

    const navigate = useNavigate();

    const handleNavigation = () => {
        navigate(to);       // Navigate to the new page
        if (onClose) {
            onClose();      // Call onClose to close the sidebar
        }
    };

    return (
        <Link to={to} style={{ textDecoration: "none" }}>
            <Flex
                align="center"
                p="4"
                mx="4"
                borderRadius="lg"
                role="group"
                cursor="pointer"
                onClick={handleNavigation}
                _hover={{
                    bg: hoverBgColor,
                    color: textColor,
                }}
                {...rest}
            >
                {icon && (
                    <Icon
                        mr="4"
                        fontSize="16"
                        _groupHover={{
                            color: textColor,
                        }}
                        as={icon}
                        color={iconColor}
                    />
                )}
                {children}
            </Flex>
        </Link>
    );
};

const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
    const { logout, user } = useAuth();
    const navigate = useNavigate();

    const performLogout = async () => {
        await logout();
        navigate('/login');
    };

    // Define colors using useColorModeValue
    const bgColor = useColorModeValue('background', 'background');
    const borderColor = useColorModeValue('primary.200', 'primary.700');
    const iconColor = useColorModeValue('primary.500', 'primary.500');
    const hoverBgColor = useColorModeValue('primary.100', 'primary.600');
    const textColor = useColorModeValue('text', 'text');
    const subtleTextColor = useColorModeValue('primary.600', 'primary.400');

    return (
        <Flex
            ml={{ base: 0, md: 60 }}
            px={{ base: 4, md: 4 }}
            height="20"
            alignItems="center"
            bg={bgColor}
            borderBottomWidth="1px"
            borderBottomColor={borderColor}
            justifyContent={{ base: "space-between", md: "flex-end" }}
            {...rest}
        >
            <IconButton
                display={{ base: "flex", md: "none" }}
                onClick={onOpen}
                variant="outline"
                aria-label="open menu"
                icon={<FiMenu />}
                color={iconColor}
                borderColor={iconColor}
                _hover={{ bg: hoverBgColor }}
            />

            <Text
                display={{ base: "flex", md: "none" }}
                fontSize="2xl"
                fontFamily="Orbitron"
                fontWeight="bold"
                color={textColor}
            >
                {WEB_SITE_TITLE}
            </Text>
            <HStack spacing={{ base: "0", md: "6" }}>
                {/*<ColorModeSwitcher />*/}
                <Flex alignItems={"center"}>
                    <Menu>
                        <MenuButton
                            py={2}
                            transition="all 0.3s"
                            _focus={{ boxShadow: "none" }}
                        >
                            <HStack>
                                <Avatar
                                    size={"sm"}
                                    name={user?.full_name}
                                    src={user?.photo_url}
                                />
                                <VStack
                                    display={{ base: "none", md: "flex" }}
                                    alignItems="flex-start"
                                    spacing="1px"
                                    ml="2"
                                >
                                    <Text fontSize="sm" color={textColor}>
                                        {user?.full_name}
                                    </Text>
                                    <Text fontSize="xs" color={subtleTextColor}>
                                        User
                                    </Text>
                                </VStack>
                                <Box display={{ base: "none", md: "flex" }}>
                                    <FiChevronDown />
                                </Box>
                            </HStack>
                        </MenuButton>
                        <MenuList
                            bg={bgColor}
                            borderColor={borderColor}
                        >
                            <MenuItem onClick={() => navigate("/profile")}>Profile</MenuItem>
                            {/*<MenuItem onClick={() => navigate("/my-plan")}>My Plan</MenuItem>*/}
                            <MenuDivider />
                            <MenuItem onClick={() => performLogout()}>Sign out</MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
            </HStack>
        </Flex>
    );
};

const SidebarWithHeader = ({ children }: { children: ReactNode }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const bgColor = useColorModeValue('background', 'background');

    return (
        <Box minH="100vh" display="flex" flexDirection="column" bg={bgColor}>
            <SidebarContent onClose={onClose} display={{ base: "none", md: "block" }} />
            <Drawer
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                returnFocusOnClose={false}
                onOverlayClick={onClose}
                size="full"
            >
                <DrawerContent>
                    <SidebarContent onClose={onClose} />
                </DrawerContent>
            </Drawer>
            {/* Mobile Navigation */}
            <MobileNav onOpen={onOpen} />
            <Box flex="1" ml={{ base: 0, md: 60 }} p="4" bg={bgColor} display="flex" flexDirection="column">
                <Box flex="1">
                    {children}
                </Box>
                <Footer />
            </Box>
        </Box>
    );
};

export default SidebarWithHeader;
