import { WarningIcon } from '@chakra-ui/icons'
import { AbsoluteCenter, Box, Container, Heading, VStack } from '@chakra-ui/react'

export const Page = (): JSX.Element => (
  <Container w="lg" minH="100vh" centerContent>
    <AbsoluteCenter>
      <Heading>
        <VStack spacing="1em">
          <Box>
            <WarningIcon color="tomato" boxSize="2em" />
          </Box>
          <Box>Oops... something went wrong</Box>
        </VStack>
      </Heading>
    </AbsoluteCenter>
  </Container>
)
