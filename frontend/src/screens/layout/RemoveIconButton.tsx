import React from 'react'
import { IconButton, IconButtonProps } from '@chakra-ui/react'
import { FiTrash2 } from 'react-icons/fi'

interface CustomIconButtonProps extends Omit<IconButtonProps, 'aria-label'> {
	ariaLabel?: string
}

export const RemoveIconButton: React.FC<CustomIconButtonProps> = ({
	onClick,
	ariaLabel = 'Remove', 
	...props
}) => {
	return (
		<IconButton
			bgColor='red.50'
			textColor='red.600'
			_hover={{ bg: 'red.100' }}
			aria-label={ariaLabel}
			icon={<FiTrash2 />}
			onClick={onClick}
			{...props} // Allows extending with additional props
		/>
	)
}
