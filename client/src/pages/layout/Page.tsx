import { Box, Container } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'
import { Header } from '../../components'


export const Layout = () => {


  return (
    <Box minH="100vh">
      <Header/>
      <Container as='main' w="lg">
          There are many benefits to a joint design and development system. Not only
          does it bring benefits to the design team, but it also brings benefits to
          engineering teams. It makes sure that our experiences have a consistent look
          and feel, not just in our design specs, but in production

          <Outlet/>
      </Container>
    </Box>
  )
}
