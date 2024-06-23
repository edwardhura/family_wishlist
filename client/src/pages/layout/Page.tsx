import { Container } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'
import { GlobalLoader, HeaderBar } from 'components'
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
        <>
          <HeaderBar />
          <Container as="main" minW={['container.sm', 'container.md', 'container.lg']} padding="2em">
            <Outlet />
          </Container>
        </>
      )}
    </>
  )
}
