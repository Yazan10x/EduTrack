import { BoxProps, Box, Stack, useColorModeValue } from '@chakra-ui/react'

export const BlCard: React.FC<BoxProps> = ({ children, ...props }) => {
	return (
		<Box
			bg='bg-surface'
			boxShadow={useColorModeValue('sm', 'sm-dark')}
			borderRadius='lg'
			flex='1'
			{...props}
		>
			<Stack spacing='4' px={{ base: '4', md: '6' }} py={{ base: '5', md: '6' }}>
				{children}
			</Stack>
		</Box>
	)
}