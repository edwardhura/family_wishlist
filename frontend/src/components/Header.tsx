import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons'
import {
  Box,
  Avatar,
  Flex,
  Spacer,
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react'
import { useFetchUsersMeQuery } from 'api/usersApi'

export const Header = () => {
  const { data: user } = useFetchUsersMeQuery()

  return (
    <Flex h="4em" background="teal.50" borderBottomWidth={1} padding="0 2em" boxShadow='base'>
      <Spacer />
      <Box padding="0.5em">
        <Avatar title={user?.name} name={user?.name} src={user?.avatar} borderColor="teal.200" borderWidth={1} _hover={ { borderColor: 'teal.100' } } />
      </Box>
      <Box padding="0.5em">
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Menu"
            icon={<HamburgerIcon h="2em" w="2em" />}
            variant="outline"
            boxSize="3em"
            color="teal.800"
            borderColor="teal.200"
            _hover={ { background: 'teal.100' } }
            _active={ { background: 'teal.100' } }
          />
          <MenuList marginTop="0.5em" boxShadow='base'>
            <MenuItem icon={<CloseIcon />}>Logout</MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </Flex>
  )
}
