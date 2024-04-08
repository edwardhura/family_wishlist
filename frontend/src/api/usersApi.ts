import { rootApi } from 'rootApi'
import { redirect } from 'react-router-dom'

export const UNAUTHORIZED = 401

interface UserResponse {
  uuid: string
  email: string
  name?: string
  googleId: string
  avatar?: string
  createdAt: string
  updatedAt: string
}

const api = rootApi.injectEndpoints({
  endpoints: (build) => ({
    fetchUsersMe: build.query<UserResponse, void>({
      query: () => ({ url: 'users/me', method: 'GET' }),
      onQueryStarted: async (_args, { queryFulfilled }) => {
        try {
          await queryFulfilled
        } catch (error) {
          redirect('/login')
        }
      },
    }),
  }),
})

export const { useFetchUsersMeQuery } = api
