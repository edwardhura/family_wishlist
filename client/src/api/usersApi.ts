import { rootApi } from "rootApi"

export const UNAUTHORIZED: number = 401

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
      query: () => ({ url: 'users/me', method: 'GET' })
    })
  })
})

export const { useFetchUsersMeQuery } = api
