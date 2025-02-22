import {Image, Text} from "@chakra-ui/react";
import {WEB_SITE_TITLE} from "./SidebarWithHeader";


const ProjectLogo = () => {
    return (
        <>
            <ProjectLogoImage/>
            <ProjectLogoText/>
        </>
    )
}

export const ProjectLogoText = () => {
    return (
        <Text fontSize="xl" fontWeight="bold" color={"black"} fontFamily="Orbitron">
            {WEB_SITE_TITLE}
        </Text>
    )
}

export const ProjectLogoImage = () => {
    return (
        <Image
            src="/logo1.png"
            alt="Logo"
            boxSize="30px"
            ml={2}
            marginRight={"5px"}
            borderRadius="full"
        />
    )
}

export default ProjectLogo
