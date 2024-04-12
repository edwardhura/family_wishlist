import { CheckIcon, CloseIcon, EditIcon } from '@chakra-ui/icons'
import { CardFooter, CardHeader, Card as ChakraCard, Heading, IconButton } from '@chakra-ui/react'
import { useRemoveWishMutation } from 'api/wishesApi'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

interface CardProps {
  uuid: string
  title: string
  comment: string
  priority: string
  link: string
  price: number
}

export const Card = ({ title, uuid }: CardProps) => {
  const navigate = useNavigate()
  const [remove] = useRemoveWishMutation()

  const onEditClick = useCallback(() => {
    void navigate(`/wishes/${uuid}/edit`)
  }, [navigate, uuid])

  const onRemoveClick = useCallback(() => {
    void remove(uuid)
  }, [uuid, remove])

  return (
    <ChakraCard>
      <CardHeader>
        <Heading size="md">{title}</Heading>
      </CardHeader>
      <CardFooter justify="space-between" flexWrap="wrap">
        <IconButton flex="1" variant="ghost" aria-label="Complete" icon={<CheckIcon />} />
        <IconButton flex="1" variant="ghost" aria-label="Edit" icon={<EditIcon />} onClick={onEditClick} />
        <IconButton flex="1" variant="ghost" aria-label="Remove" icon={<CloseIcon />} onClick={onRemoveClick} />
      </CardFooter>
    </ChakraCard>
  )
}
