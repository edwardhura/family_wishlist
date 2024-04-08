import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const rootApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000/api/',
    credentials: 'include',
    mode: 'cors',
  }),
  endpoints: () => ({}),
})
