import { Container, Heading } from '@chakra-ui/react'
import { FamilyForm } from '../form'
import { Breadcrumb } from 'components'
import { useParams } from 'react-router-dom'

export const Page = (): JSX.Element => {
  const { uuid } = useParams()

  return (
    <Container minW="100%">
      <Breadcrumb
        tree={[
          { path: '/wishes', name: 'Board' },
          { path: `/families/${uuid}/edit`, name: 'Edit', current: true },
        ]}
      />
      <Heading padding="1em 0 2em" size="xl">
        Edit Family
      </Heading>
      <FamilyForm uuid={uuid} />
    </Container>
  )
}
