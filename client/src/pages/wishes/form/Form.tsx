import {
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Radio,
  RadioGroup,
  Spacer,
  Stack,
  StackDivider,
  Textarea,
  VStack,
} from '@chakra-ui/react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { PriceInput } from 'components'
import { useCreateWishMutation, useUpdateWishMutation, useFetchWishQuery } from 'api/wishesApi'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApiStatusNotification } from 'hooks/useApiStatusNotification'
import { Priority, PrioritySchema } from 'types'

interface FormInput {
  title: string
  comment: string
  priority: Priority
  link: string
  price: number
}

export const WishForm = ({ uuid }: { uuid?: string }): JSX.Element => {
  const navigate = useNavigate()
  const { data, isSuccess: isPreloaded } = useFetchWishQuery(uuid, { skip: !uuid })
  const [create, { isLoading: createIsLoading, isSuccess: createIsSuccess, isError: isCreateError }] =
    useCreateWishMutation()
  const [update, { isLoading: updateIsLoading, isSuccess: updateIsSuccess, isError: isUpdateError }] =
    useUpdateWishMutation()

  useApiStatusNotification({ isSuccess: updateIsSuccess, isError: isUpdateError })
  useApiStatusNotification({ isSuccess: createIsSuccess, isError: isCreateError })

  const {
    handleSubmit,
    register,
    formState: { errors },
    getValues,
    reset,
  } = useForm<FormInput>({
    defaultValues: { priority: Priority.low, price: 0, title: data?.title },
  })

  useEffect(() => {
    if (createIsSuccess || updateIsSuccess) {
      navigate('/')
    }
  }, [createIsSuccess, updateIsSuccess, navigate])

  useEffect(() => {
    if (isPreloaded) {
      const { priority = Priority.low, ...restData } = data
      reset({ ...restData, priority })
    }
  }, [reset, data, isPreloaded])

  const onSubmit: SubmitHandler<FormInput> = ({ price, ...restFormData }) => {
    const serializedPrice = price ? price : 0
    console.log(restFormData)
    if (uuid) {
      return update({ ...restFormData, price: serializedPrice, uuid })
    }
    return create({ ...restFormData, price: serializedPrice })
  }

  const onSubmitHandler = (e: React.FormEvent): void => {
    void handleSubmit(onSubmit)(e)
  }

  const priorityFieldId = 'priority'
  const defaultPriority = getValues(priorityFieldId)

  return (
    <form onSubmit={onSubmitHandler}>
      <VStack spacing="2em" divider={<StackDivider borderColor="gray.200" />}>
        <HStack spacing="1em">
          <FormControl isInvalid={!!errors.title}>
            <FormLabel htmlFor="title"> Title </FormLabel>
            <Input
              id="title"
              placeholder="Card Name"
              variant="outline"
              w="25em"
              {...register('title', {
                required: 'Title field is required',
              })}
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="price"> Price </FormLabel>
            <PriceInput id="price" variant="outline" {...register('price', { valueAsNumber: true })} />
          </FormControl>

          <FormControl isInvalid={!!errors.priority}>
            <FormLabel htmlFor="priority"> Priority </FormLabel>
            <RadioGroup defaultValue={defaultPriority}>
              <Stack spacing={5} direction="row">
                <Radio {...register(priorityFieldId)} size="md" value={Priority.low} colorScheme={PrioritySchema.low}>
                  Low
                </Radio>
                <Radio
                  {...register(priorityFieldId)}
                  size="md"
                  colorScheme={PrioritySchema.medium}
                  value={Priority.medium}
                >
                  Medium
                </Radio>
                <Radio {...register(priorityFieldId)} size="md" colorScheme={PrioritySchema.high} value={Priority.high}>
                  High
                </Radio>
              </Stack>
            </RadioGroup>
          </FormControl>
        </HStack>
        <Flex w="100%" flexDirection="column" gap="2em">
          <FormControl>
            <FormLabel htmlFor="link"> Wish link </FormLabel>
            <Input id="link" placeholder="URL" variant="outline" {...register('link')} />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="comment"> Comments </FormLabel>
            <Textarea id="comment" placeholder="Additional Information" {...register('comment')} />
          </FormControl>
        </Flex>
      </VStack>
      <Divider borderColor="gray.200" marginTop="3em" />
      <Flex>
        <Spacer />
        <Button mt={4} colorScheme="teal" isLoading={createIsLoading || updateIsLoading} type="submit">
          {uuid ? 'Update' : 'Create'}
        </Button>
      </Flex>
    </form>
  )
}
