import { FlexProps, Flex } from '@chakra-ui/react';

export const FlexWrap: React.FC<FlexProps> = ({ children, ...props }) => {
	return (
		<Flex
			direction={{ base: 'column', md: 'row' }} // Stack vertically on small screens, horizontally on larger
			align={{ md: 'center'}}
			gap={4} 
			{...props} // Spread additional props
		>
			{children}
		</Flex>
	)
}
