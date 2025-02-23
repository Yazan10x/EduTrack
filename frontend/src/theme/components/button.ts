const Button = {
    baseStyle: {
        fontWeight: "bold",
        borderRadius: "16px",
    },
    sizes: {
        sm: {
            fontSize: "12px",
            padding: "8px 12px",
        },
        md: {
            fontSize: "16px",
            padding: "10px 16px",
        },
        lg: {
            fontSize: "20px",
            padding: "12px 20px",
        },
    },
    variants: {
        primary: {
            bg: "secondary.500",
            color: "neutral.50",
            _hover: {
                bg: "primary.600",
            },
        },
        secondary: {
            bg: "gray.100",
            color: "black",
            _hover: {
                bg: "gray.200",
            },
        },
        outline: {
            border: "2px solid",
            borderColor: "primary.900",
            color: "primary.900",
            _hover: {
                bg: "primary.50",
            },
        },
    },
    defaultProps: {
        size: "md",
        variant: "primary",
    },
};

export default Button;