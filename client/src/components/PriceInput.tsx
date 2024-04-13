import { InputGroup, InputLeftElement, Input, InputRightAddon, InputProps } from '@chakra-ui/react'
import React, { forwardRef } from 'react'

export const PriceInput: React.FC<InputProps> = forwardRef(function PriceInput(props, ref) {
  return (
    <InputGroup>
      <InputLeftElement pointerEvents="none" color="gray.300" fontSize="1.2em">
        &#8372;
      </InputLeftElement>
      <Input ref={ref} type="number" {...props} />
      <InputRightAddon>UAH</InputRightAddon>
    </InputGroup>
  )
})
