import { rootApi } from 'rootApi'
import { UsersAvailableScopes } from 'types/scopes'

interface UserResponse {
  uuid: string
  email: string
  name: string
  avatar?: string
  familyUuid?: string
}

interface FetchQueryParams {
  scope: UsersAvailableScopes
}

const api = rootApi.injectEndpoints({
  endpoints: (build) => ({
    fetchUsersMe: build.query<UserResponse, void>({
      query: () => ({ url: '/users/me', method: 'GET' }),
      providesTags: [{ type: 'User', id: 'ME' }],
    }),
    fetchUsers: build.query<UserResponse[], { params: FetchQueryParams }>({
      query: ({ params }) => ({ url: '/users/', method: 'GET', params }),
      providesTags: (result) =>
        result?.length
          ? [...result.map(({ uuid }) => ({ type: 'User' as const, id: uuid })), { type: 'User', id: 'LIST' }]
          : [{ type: 'User', id: 'LIST' }],
    }),
  }),
})

export const { useFetchUsersMeQuery, useFetchUsersQuery } = api
