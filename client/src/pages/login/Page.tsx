import { LoginLink } from 'components'
import { useNavigate } from 'react-router-dom'
import { GlobalLoader } from 'components'
import { useFetchUsersMeQuery } from 'api/usersApi'
import { useEffect } from 'react'
import { Container, Heading, Card, CardHeader, CardBody, Divider, Center, AbsoluteCenter } from '@chakra-ui/react'

export const Page = () => {
  const navigate = useNavigate()
  const { data: user, isLoading, isSuccess } = useFetchUsersMeQuery()

  useEffect(() => {
    if (isSuccess && user.uuid) {
      navigate('/')
    }
  }, [isSuccess, user, navigate])

  if (isLoading) return <GlobalLoader />

  return (
    <Container w="lg" minH="100vh" centerContent>
      <AbsoluteCenter>
        <Card background="teal.50" borderWidth={1} borderColor="teal.200">
          <CardHeader>
            <Heading size={'md'}>Please login with Google Account</Heading>
          </CardHeader>
          <Divider color="teal.200" />
          <CardBody>
            <Center>
              <LoginLink />
            </Center>
          </CardBody>
        </Card>
      </AbsoluteCenter>
    </Container>
  )
}
