import { LoginLink} from '../../components'
import { Container, Heading, Card, CardHeader, CardBody, Divider, Center, AbsoluteCenter } from '@chakra-ui/react'

export const Login = () => (
  <Container w="lg" minH="100vh" centerContent>
    <AbsoluteCenter>
      <Card>
        <CardHeader>
          <Heading size={'md'}>Please login with Google Account</Heading>
        </CardHeader>
        <Divider color='gray.400'/>
        <CardBody>
          <Center><LoginLink/></Center>
        </CardBody>
      </Card>
    </AbsoluteCenter>
  </Container>
)
