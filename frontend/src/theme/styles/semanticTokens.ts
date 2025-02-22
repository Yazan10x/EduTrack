const semanticTokens = {
    colors: {
        text: {
            default: 'neutral.900', // Black for light mode
            _dark: 'neutral.50', // White for dark mode
        },
        background: {
            default: 'neutral.50', // Light gray background
            _dark: 'neutral.900', // Dark gray background
        },
        border: {
            default: 'neutral.200', // Subtle light border
            _dark: 'neutral.700', // Subtle dark border
        },
        primary: {
            default: 'primary.700', // Main interactive elements color
            _dark: 'primary.300', // Adjusted for dark mode
        },
        secondary: {
            default: 'secondary.700', // Accent color
            _dark: 'secondary.400', // Slightly muted for dark mode
        },
    },
    radii: {
        button: '4px', // Slightly rounded corners for buttons
    },
    shadows: {
        card: {
            default: '0 2px 4px rgba(0, 0, 0, 0.1)', // Subtle shadow for light mode
            _dark: '0 2px 4px rgba(0, 0, 0, 0.4)', // Enhanced shadow for dark mode
        },
    },
};

export default semanticTokens;