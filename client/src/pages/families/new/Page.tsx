import { Container, Heading } from '@chakra-ui/react'
import { FamilyForm } from '../form'
import { Breadcrumb } from 'components'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useFetchUsersMeQuery } from 'api/usersApi'

export const Page = (): JSX.Element => {
  const navigate = useNavigate()
  const { data: user } = useFetchUsersMeQuery()

  useEffect(() => {
    if (user?.familyUuid) {
      navigate(`/families/${user.familyUuid}/edit`)
    }
  }, [user, navigate])

  return (
    <Container minW="100%">
      <Breadcrumb
        tree={[
          { path: '/wishes', name: 'Board' },
          { path: '/families/new', name: 'New', current: true },
        ]}
      />
      <Heading padding="1em 0 2em" size="xl">
        Create Family
      </Heading>
      <FamilyForm />
    </Container>
  )
}
