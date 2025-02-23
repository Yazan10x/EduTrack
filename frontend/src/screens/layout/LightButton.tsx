import React from 'react';
import { Button, ButtonProps } from '@chakra-ui/react';

interface LightButtonProps extends ButtonProps {
    color?: string;
}

export const LightButton: React.FC<LightButtonProps> = ({ color = 'green', children, ...props }) => {
    return (
        <Button
            bgColor={`${color}.50`}
            textColor={`${color}.600`}
            _hover={{ bg: `${color}.100` }}
            {...props}
        >
            {children}
        </Button>
    );
};