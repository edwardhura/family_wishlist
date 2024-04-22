import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { navigate } from 'utils/navigation'

const UNAUTHORIZED = 401

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_SERVER_HOST_API || 'http://localhost:8000/api/',
  credentials: 'include',
  mode: 'cors',
})
const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions,
) => {
  let result = await baseQuery(args, api, extraOptions)
  if (result.error && result.error.status === UNAUTHORIZED) {
    const refreshResult = await baseQuery(
      {
        url: '/sessions/refresh',
        method: 'POST',
      },
      api,
      extraOptions,
    )
    if (refreshResult.data) {
      result = await baseQuery(args, api, extraOptions)
    } else {
      void navigate('/login')
    }
  }
  return result
}

export const rootApi = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
  tagTypes: ['WISH_LIST', 'USER_ME'],
})
