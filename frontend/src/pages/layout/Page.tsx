import { Box, Container } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'
import { GlobalLoader, Header } from 'components'
import { useFetchUsersMeQuery } from 'api/usersApi'
import { Oops } from 'pages/oops/Page'

export const Layout = () => {
  const { isLoading, isError } = useFetchUsersMeQuery()

  if (isError) return <Oops />

  return (
    <>
      {isLoading ? (
        <GlobalLoader />
      ) : (
        <Box minH="100vh">
          <Header />
          <Container as="main" w="lg">
            There are many benefits to a joint design and development system.
            Not only does it bring benefits to the design team, but it also
            brings benefits to engineering teams. It makes sure that our
            experiences have a consistent look and feel, not just in our design
            specs, but in production
            <Outlet />
          </Container>
        </Box>
      )}
    </>
  )
}
