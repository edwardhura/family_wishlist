import { Grid, Box, Heading } from '@chakra-ui/react'
import { useFetchWishesQuery } from 'api/wishesApi'
import { AddWishButton } from 'components'
import { Card } from '../card'

export const Page = () => {
  const { data: wishes } = useFetchWishesQuery()

  return (
    <Box>
      <Heading padding="0 1em 1em"> Wishlist </Heading>
      <Grid w="100%" gap={8} templateColumns="repeat(3, 1fr)" padding="1em 0 3em">
        {wishes?.map((wish) => <Card key={`wish-${wish.uuid}`} {...wish} />)}
      </Grid>
      <AddWishButton position="absolute" bottom="2em" right="2em" />
    </Box>
  )
}
