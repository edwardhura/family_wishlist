import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons"
import { Box, Avatar, Flex, Spacer, Menu, MenuButton, IconButton, MenuList, MenuItem } from "@chakra-ui/react"
import { useFetchUsersMeQuery } from 'api/usersApi'

export const Header = () => {
  const { data: user } = useFetchUsersMeQuery()

  return (
    <Flex h='4em' borderBottomWidth={1} borderColor='gray.400'>
      <Spacer/>
      <Box padding="0.5em">
        <Avatar title={user?.name} name={user?.name} src={user?.avatar} />
      </Box>
      <Box padding="0.5em">
        <Menu>
          <MenuButton as={IconButton} aria-label="Menu" icon={<HamburgerIcon h='2em' w='2em' />} variant='outline' boxSize='3em' color='gray.800' borderColor='gray.400' />
          <MenuList marginTop='0.5em' borderColor='gray.400'>
            <MenuItem icon={<CloseIcon/>}>
              Logout
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </Flex>
  )
}
