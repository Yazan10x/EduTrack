const globalStyles = {
    styles: {
        global: {
            body: {
                bg: 'neutral.50', // Light background for the whole app
                color: 'neutral.900', // High contrast black text
                fontFamily: 'body',
                lineHeight: 'base',
            },
            a: {
                color: 'primary.900', // Subtle dark gray links
                _hover: {
                    textDecoration: 'underline',
                    color: 'primary.900', // Slightly darker on hover
                },
            },
            h1: {
                color: 'neutral.900',
                fontSize: '2xl',
                fontWeight: 'bold',
            },
            h2: {
                color: 'neutral.800',
                fontSize: 'xl',
                fontWeight: 'semibold',
            },
            p: {
                color: 'neutral.800', // Softer tone for paragraph text
                fontSize: 'md',
            },
        },
    },
};

export default globalStyles;