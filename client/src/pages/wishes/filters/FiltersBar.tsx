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
    <Flex margin="1em 0" gap="2em" flexDirection={['column', 'column', 'row']}>
      {userMe?.familyUuid && <ScopeFilter w={['1fr', '24em']} />}
      <Spacer display={['none', 'none', 'block']} />
      <Flex>
        <Spacer display={['block', 'block', 'none']} />
        <IsDoneFilter />
      </Flex>
    </Flex>
  )
}
