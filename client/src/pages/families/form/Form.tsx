import { Button, Divider, Flex, FormControl, FormLabel, Input, Spacer } from '@chakra-ui/react'
import { useCreateFamilyMutation, useFetchFamilyQuery, useUpdateFamilyMutation } from 'api/familiesApi'
import { useApiStatusNotification } from 'hooks/useApiStatusNotification'
import React, { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

interface FormInput {
  name: string
}

export const FamilyForm = ({ uuid }: { uuid?: string }): React.JSX.Element => {
  const navigate = useNavigate()
  const { data: preloadedData, isSuccess: isPreloaded } = useFetchFamilyQuery(uuid, { skip: !uuid })
  const [
    create,
    { data: createdData, isLoading: createIsLoading, isSuccess: createIsSuccess, isError: isCreateError },
  ] = useCreateFamilyMutation()
  const [update, { isLoading: updateIsLoading, isSuccess: updateIsSuccess, isError: isUpdateError }] =
    useUpdateFamilyMutation()

  useApiStatusNotification({ isSuccess: updateIsSuccess, isError: isUpdateError })
  useApiStatusNotification({ isSuccess: createIsSuccess, isError: isCreateError })

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<FormInput>({ defaultValues: { name: preloadedData?.name } })

  useEffect(() => {
    if (isPreloaded) {
      reset({ name: preloadedData?.name })
    }
  }, [preloadedData, isPreloaded, reset])

  useEffect(() => {
    if (createIsSuccess && createdData.uuid) {
      navigate(`/families/${createdData.uuid}/edit`)
    }
  }, [createIsSuccess, navigate, createdData])

  const onSubmit: SubmitHandler<FormInput> = ({ name }) => {
    if (uuid) {
      return update({ name, uuid })
    }
    return create({ name })
  }

  const onSubmitHandler = (e: React.FormEvent): void => {
    void handleSubmit(onSubmit)(e)
  }

  return (
    <form onSubmit={onSubmitHandler}>
      <FormControl isInvalid={!!errors.name}>
        <FormLabel htmlFor="title"> Family Name </FormLabel>
        <Input
          id="name"
          placeholder="Name"
          variant="outline"
          bg="white"
          {...register('name', {
            required: 'Name field is required',
          })}
        />
      </FormControl>
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
