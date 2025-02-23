import React from 'react';
import { Box, HStack, Text, Spacer, Icon } from '@chakra-ui/react';
import { IconType } from 'react-icons';

type InfoBoxProps = {
  colorScheme: string;
  icon: IconType;
  number: number;
  text: string;
};

export const InfoCard: React.FC<InfoBoxProps> = ({ colorScheme, icon, number, text }) => {
  return (
    <Box
      as={HStack}
      bgColor={`${colorScheme}.50`}
      border="2px"
      borderColor={`${colorScheme}.500`}
      borderStyle="dashed"
      rounded="lg"
      px={8}
      py={4}
    >
      <div>
        <Text fontWeight="black" fontSize="3xl" color={`${colorScheme}.500`}>
          {number}
        </Text>
        <Text fontWeight="medium" textColor="gray.600">
          {text}
        </Text>
      </div>

      <Spacer />

      <Icon as={icon} boxSize={12} color={`${colorScheme}.500`} />
    </Box>
  );
};
