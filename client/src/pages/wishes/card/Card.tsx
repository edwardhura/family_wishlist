import { CheckIcon, CloseIcon, EditIcon, ExternalLinkIcon } from '@chakra-ui/icons'
import {
  CardBody,
  CardFooter,
  CardHeader,
  Card,
  Heading,
  IconButton,
  Box,
  Link,
  Flex,
  Spacer,
  Text,
} from '@chakra-ui/react'
import { useRemoveWishMutation, useUpdateWishMutation } from 'api/wishesApi'
import { ExpandableText } from 'components'
import { useApiStatusNotification } from 'hooks/useApiStatusNotification'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Priority, PriorityColor } from 'types'
import { formatPrice } from 'utils/formatPrice'

interface CardProps {
  uuid: string
  title: string
  comment: string
  priority: Priority
  link: string
  price: number
  isDone: boolean
}

const Cap = ({ priority }: { priority: Priority }): React.JSX.Element => (
  <Box
    w="100%"
    h={2}
    minH={2}
    maxH={2}
    padding={0}
    backgroundColor={PriorityColor[priority]}
    borderTopRadius="inherit"
  />
)

export const CardItem = ({ title, uuid, isDone, comment, priority, link, price }: CardProps) => {
  const navigate = useNavigate()
  const [remove, { isLoading: removeIsLoading, isSuccess: removeIsSuccess, isError: removeIsError }] =
    useRemoveWishMutation()
  const [update, { isLoading: updateIsLoading, isSuccess: updateIsSuccess, isError: isUpdateError }] =
    useUpdateWishMutation()
  useApiStatusNotification({ isSuccess: removeIsSuccess, isError: removeIsError })
  useApiStatusNotification({ isSuccess: updateIsSuccess, isError: isUpdateError })

  const onCompleteClick = useCallback(() => {
    void update({ uuid, isDone: !isDone })
  }, [update, uuid, isDone])

  const onEditClick = useCallback(() => {
    void navigate(`/wishes/${uuid}/edit`)
  }, [navigate, uuid])

  const onRemoveClick = useCallback(() => {
    void remove(uuid)
  }, [uuid, remove])

  return (
    <Card>
      <Cap priority={priority} />
      <CardHeader>
        <Flex gap="12px">
          <Heading title={title} size="md" maxH="48px" overflow="hidden" textOverflow="ellipsis">
            {title}
          </Heading>
          <Spacer />
          {typeof price === 'number' && <Text>{formatPrice(price)}</Text>}
          {link && (
            <Link href={link} color={'gray.800'} mt="-2px" isExternal>
              <ExternalLinkIcon />
            </Link>
          )}
        </Flex>
      </CardHeader>
      <CardBody>
        <ExpandableText>{comment}</ExpandableText>
      </CardBody>
      <CardFooter justify="space-between" flexWrap="wrap">
        <IconButton
          flex="1"
          variant="ghost"
          aria-label="Complete"
          icon={<CheckIcon />}
          onClick={onCompleteClick}
          isLoading={updateIsLoading}
        />
        <IconButton flex="1" variant="ghost" aria-label="Edit" icon={<EditIcon />} onClick={onEditClick} />
        <IconButton
          flex="1"
          variant="ghost"
          aria-label="Remove"
          icon={<CloseIcon />}
          onClick={onRemoveClick}
          isLoading={removeIsLoading}
        />
      </CardFooter>
    </Card>
  )
}
