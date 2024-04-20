import React from 'react'
import { Center, Flex, Spacer, Spinner } from '@chakra-ui/react'
import { ScopeFilter } from './ScopeFilter'
import { IsDoneFilter } from './IsDoneFilter'
import { useFetchUsersMeQuery } from 'api/usersApi'

export const FiltersBar = (): React.JSX.Element => {
  const { data: userMe, isLoading } = useFetchUsersMeQuery()

  if (isLoading) {
    return (
      <Center>
        <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
      </Center>
    )
  }

  return (
    <Flex margin="1em 0" gap="2em">
      {userMe?.familyUuid && <ScopeFilter w="24em" />}
      <Spacer />
      <IsDoneFilter />
    </Flex>
  )
}
