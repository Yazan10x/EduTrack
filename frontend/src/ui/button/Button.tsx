import React from "react";
import {
    Button as ChakraButton,
    ButtonProps as ChakraButtonProps,
} from "@chakra-ui/react";
import { FiArrowRight, FiArrowLeft } from "react-icons/fi";
import {ArrowLeftIcon, ArrowRightIcon} from "@chakra-ui/icons";

// Extend Chakra's ButtonProps to add custom props
export interface ButtonProps extends ChakraButtonProps {
    withRightArrow?: boolean; // Show right arrow
    withLeftArrow?: boolean;  // Show left arrow
}

const Button: React.FC<ButtonProps> = ({
                                           children,
                                           withRightArrow,
                                           withLeftArrow,
                                           leftIcon,
                                           rightIcon,
                                           ...props
                                       }) => {
    // Use explicitly provided icons or fallback to arrows if the custom props are set
    const effectiveLeftIcon =
        leftIcon ?? (withLeftArrow ? <ArrowLeftIcon style={{ transition: "transform 0.3s ease" }} /> : undefined);

    const effectiveRightIcon =
        rightIcon ?? (withRightArrow ? <ArrowRightIcon style={{ transition: "transform 0.3s ease" }} /> : undefined);

    // Render the button with appropriate icons
    return (
        <ChakraButton
            {...props}
            leftIcon={effectiveLeftIcon}
            rightIcon={effectiveRightIcon}
            _hover={{
                ...props._hover,
                "& svg": {
                    transform: withRightArrow
                        ? "translateX(6px)"
                        : withLeftArrow
                            ? "translateX(-6px)"
                            : undefined, // Apply hover animations only for fallback arrows
                },
            }}
            sx={{
                "& svg": {
                    transition: "transform 0.3s ease", // Ensure smooth animation
                },
            }}
        >
            {children}
        </ChakraButton>
    );
};

export default Button;