import React from 'react'
import { Flex, Spacer } from '@chakra-ui/react'
import { ScopeFilter } from './ScopeFilter'
import { IsDoneFilter } from './IsDoneFilter'

export const FiltersBar = (): React.JSX.Element => {
  return (
    <Flex margin="1em 0" gap="2em">
      <ScopeFilter w="24em" />
      <Spacer />
      <IsDoneFilter />
    </Flex>
  )
}
