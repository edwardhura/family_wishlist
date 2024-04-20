import { Box, Heading, Divider } from '@chakra-ui/react'
import { AddWishButton } from 'components'
import { FiltersBar } from '../filters'
import { Content } from './Content'

export const Page = (): JSX.Element => (
  <Box>
    <Heading padding="1em"> Wishlist </Heading>
    <Divider />
    <FiltersBar />
    <Divider />
    <Content />
    <AddWishButton position="fixed" bottom="2em" right="4em" />
  </Box>
)
