import { rootApi } from 'rootApi'
import { UsersAvailableScopes } from 'types/scopes'

interface UserResponse {
  uuid: string
  email: string
  name: string
  avatar?: string
}

interface FetchQueryParams {
  scope: UsersAvailableScopes
}

const api = rootApi.injectEndpoints({
  endpoints: (build) => ({
    fetchUsersMe: build.query<UserResponse, void>({
      query: () => ({ url: '/users/me', method: 'GET' }),
      providesTags: ['USER_ME'],
    }),
    fetchUsers: build.query<UserResponse[], { params: FetchQueryParams }>({
      query: ({ params }) => ({ url: '/users/', method: 'GET', params }),
    }),
  }),
})

export const { useFetchUsersMeQuery, useFetchUsersQuery } = api
