import { FormLabel, Switch, HStack } from '@chakra-ui/react'
import React, { useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'

export const IsDoneFilter: React.FC = (): React.JSX.Element => {
  const [searchParams, setSearchParams] = useSearchParams()

  const onSwitchChangeHandler = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.checked) {
        searchParams.set('isDone', 'true')
        return setSearchParams(searchParams)
      } else {
        searchParams.delete('isDone')
        return setSearchParams(searchParams)
      }
    },
    [searchParams, setSearchParams],
  )

  return (
    <HStack>
      <FormLabel htmlFor="isDone" m="0 5px">
        Show Completed
      </FormLabel>
      <Switch
        id="isDone"
        size="lg"
        colorScheme="teal"
        onChange={onSwitchChangeHandler}
        isChecked={!!searchParams.get('isDone')}
      />
    </HStack>
  )
}
