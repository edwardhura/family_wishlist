import { Select, SelectProps, Skeleton } from '@chakra-ui/react'
import { useFetchUsersQuery } from 'api/usersApi'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { UsersAvailableScopes, WishesAvailableScopes } from 'types/scopes'

interface FilterOptions {
  name: string
  scope: WishesAvailableScopes
  uuid?: string
}

const getDefaultValueFromParams = (searchParams: URLSearchParams): string => {
  if (
    searchParams.get('scope') === WishesAvailableScopes.FamilyUser &&
    searchParams.get(`${WishesAvailableScopes.FamilyUser}Uuid`)
  ) {
    return `${WishesAvailableScopes.FamilyUser}::${searchParams.get(`${WishesAvailableScopes.FamilyUser}Uuid`)}`
  }

  return UsersAvailableScopes.Family
}

export const ScopeFilter: React.FC<SelectProps> = (props): React.JSX.Element => {
  const [searchParams, setSearchParams] = useSearchParams()
  const { data: usersData, isSuccess } = useFetchUsersQuery({ params: { scope: UsersAvailableScopes.Family } })
  const [options, setOptions] = useState<FilterOptions[]>([])

  useEffect(() => {
    if (usersData?.length) {
      const defaultOption: FilterOptions = { name: 'Family', scope: WishesAvailableScopes.Family }
      const familyUserOptions: FilterOptions[] = usersData.map(({ uuid, name }) => ({
        scope: WishesAvailableScopes.FamilyUser,
        name,
        uuid,
      }))
      setOptions([defaultOption, ...familyUserOptions])
    }
  }, [usersData])

  const onChangeHandler: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    const value = e.currentTarget.value
    if (value) {
      const [scope, uuid] = value.split('::')
      searchParams.set('scope', scope)
      if (uuid) {
        searchParams.set(`${scope}Uuid`, uuid)
      } else {
        searchParams.delete('userUuid')
      }
      return setSearchParams(searchParams)
    } else {
      searchParams.delete('scope')
      searchParams.delete('userUuid')
      return setSearchParams(searchParams)
    }
  }

  return (
    <Skeleton isLoaded={isSuccess}>
      <Select bg="white" onChange={onChangeHandler} value={getDefaultValueFromParams(searchParams)} {...props}>
        {options.map(({ name, scope, uuid }) => (
          <option
            key={`scope-filter-${scope}`}
            color="black"
            value={`${scope}${uuid ? `::${uuid}` : ''}`}
            aria-label="Scope filter"
          >
            {name}
          </option>
        ))}
      </Select>
    </Skeleton>
  )
}
