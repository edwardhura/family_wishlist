import { Grid, Box, Heading, Divider } from '@chakra-ui/react'
import { useFetchWishesQuery } from 'api/wishesApi'
import { AddWishButton } from 'components'
import { Card } from '../card'
import { FiltersBar } from '../filters'
import { useSearchParams } from 'react-router-dom'

export const Page = (): JSX.Element => {
  const [searchParams] = useSearchParams()
  const queryParams = Object.fromEntries(searchParams.entries())
  const { data: wishes } = useFetchWishesQuery({ params: queryParams })

  return (
    <Box>
      <Heading padding="1em"> Wishlist </Heading>
      <Divider />
      <FiltersBar />
      <Divider />
      <Grid w="100%" gap={8} templateColumns="repeat(3, 1fr)" padding="1em 0 3em">
        {wishes?.map((wish) => <Card key={`wish-${wish.uuid}`} {...wish} />)}
      </Grid>
      <AddWishButton position="fixed" bottom="2em" right="4em" />
    </Box>
  )
}
