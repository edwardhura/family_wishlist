import { AbsoluteCenter, Box, Spinner } from '@chakra-ui/react'

export const GlobalLoader = (): JSX.Element => (
  <Box minH="100vh">
    <AbsoluteCenter>
      <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
    </AbsoluteCenter>
  </Box>
)
