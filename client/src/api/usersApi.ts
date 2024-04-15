import { rootApi } from 'rootApi'

interface UserResponse {
  uuid: string
  email: string
  name?: string
  avatar?: string
}

const api = rootApi.injectEndpoints({
  endpoints: (build) => ({
    fetchUsersMe: build.query<UserResponse, void>({
      query: () => ({ url: 'users/me', method: 'GET' }),
    }),
  }),
})

export const { useFetchUsersMeQuery } = api