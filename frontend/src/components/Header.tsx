import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons'
import { Box, Avatar, Flex, Spacer, Menu, MenuButton, IconButton, MenuList, MenuItem } from '@chakra-ui/react'
import { useFetchUsersMeQuery } from 'api/usersApi'

export const Header = () => {
  const { data: user } = useFetchUsersMeQuery()

  return (
    <Flex h="4em" background="teal.500" borderBottomWidth={1} padding="0 2em" boxShadow="base">
      <Spacer />
      <Box padding="0.5em">
        <Avatar
          title={user?.name}
          name={user?.name}
          src={user?.avatar}
          colorScheme="teal"
          borderWidth="2px"
          borderColor="white"
        />
      </Box>
      <Box padding="0.5em">
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Menu"
            icon={<HamburgerIcon h="2em" w="2em" />}
            variant="outline"
            boxSize="3em"
            colorScheme="teal"
            color="white"
            borderWidth="2px"
            _hover={{ background: 'teal.600' }}
            _active={{ background: 'teal.600' }}
          />
          <MenuList marginTop="0.5em" boxShadow="base">
            <MenuItem icon={<CloseIcon />}>Logout</MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </Flex>
  )
}
