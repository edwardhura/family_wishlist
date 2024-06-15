import { useFetchUsersMeQuery } from 'api/usersApi'

export const useEntityOwnByMe = (uuid: string): boolean => {
  const { data: { uuid: myCurrentUserUuid } = {} } = useFetchUsersMeQuery()

  return uuid === myCurrentUserUuid
}
