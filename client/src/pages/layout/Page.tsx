import { Box, Container } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'
import { GlobalLoader, Header } from 'components'
import { useFetchUsersMeQuery } from 'api/usersApi'
import { Oops } from 'pages'

export const Page = (): JSX.Element => {
  const { isLoading, isError } = useFetchUsersMeQuery()

  if (isError) return <Oops />

  return (
    <>
      {isLoading ? (
        <GlobalLoader />
      ) : (
        <Box minH="100vh">
          <Header />
          <Container as="main" minW="container.lg" padding="2em">
            <Outlet />
          </Container>
        </Box>
      )}
    </>
  )
}
