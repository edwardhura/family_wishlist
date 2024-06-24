import { Grid } from '@chakra-ui/react'
import { useFetchWishesQuery } from 'api/wishesApi'
import { Card } from '../card'
import { useSearchParams } from 'react-router-dom'

export const Content = (): JSX.Element => {
  const [searchParams] = useSearchParams()
  const queryParams = { ...Object.fromEntries(searchParams.entries()) }
  const { data: wishes } = useFetchWishesQuery({ params: queryParams })

  return (
    <Grid w="100%" gap={8} templateColumns={['repeat(1, 1fr)', 'repeat(1, 1fr)', 'repeat(3, 1fr)']} padding="1em 0 3em">
      {wishes?.map((wish) => <Card key={`wish-${wish.uuid}`} {...wish} />)}
    </Grid>
  )
}
