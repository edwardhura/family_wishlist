import { AddIcon } from '@chakra-ui/icons'
import { IconButtonProps, IconButton } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

type ModifiedIconButtonProps = Omit<IconButtonProps, 'aria-label'>

export const AddWishButton = (props: ModifiedIconButtonProps): JSX.Element => {
  const navigate = useNavigate()
  const onClickHandler = (): void => navigate('/wishes/new')

  return (
    <IconButton
      isRound
      w="4em"
      h="4em"
      {...props}
      aria-label="Add Wish"
      onClick={onClickHandler}
      colorScheme="teal"
      icon={<AddIcon />}
    />
  )
}
