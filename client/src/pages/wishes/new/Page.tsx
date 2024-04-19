import { Container, Heading } from '@chakra-ui/react'
import { WishForm } from '../form'
import { Breadcrumb } from 'components'

export const Page = (): JSX.Element => (
  <Container minW="100%">
    <Breadcrumb
      tree={[
        { path: '/wishes', name: 'Board' },
        { path: `/wishes/new`, name: 'New', current: true },
      ]}
    />
    <Heading padding="1em 0 2em" size="xl">
      Create wish
    </Heading>
    <WishForm />
  </Container>
)
