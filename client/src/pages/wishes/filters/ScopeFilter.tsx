import { Select, SelectProps } from '@chakra-ui/react'
import React from 'react'

interface FilterOptions {
  name: string
  value: string
}

export const ScopeFilter: React.FC<SelectProps> = (props): React.JSX.Element => {
  const options: FilterOptions[] = [{ name: 'Family', value: 'family' }]

  return (
    <Select colorScheme="teal" bg="teal.500" color="white" {...props}>
      {options.map(({ name, value }) => (
        <option key={`scope-filter-${value}`} value={value}>
          {name}
        </option>
      ))}
    </Select>
  )
}
