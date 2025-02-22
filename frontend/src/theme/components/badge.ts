const Badge = {
    baseStyle: {
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    variants: {
        subtle: {
            bg: 'gray.200',
            color: 'gray.800',
        },
        solid: {
            bg: 'brand.500',
            color: 'white',
        },
    },
    defaultProps: {
        variant: 'subtle',
        colorScheme: 'brand',
    },
};

export default Badge;