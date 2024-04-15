import { rootApi } from 'rootApi'
import { Priority } from 'types'

interface WishResponse {
  uuid: string
  title: string
  comment: string
  priority: Priority
  link: string
  price: number
  isDone: boolean
}

interface CreateWishParams {
  title: string
  comment: string
  priority: Priority
  link: string
  price: number
}

interface UpdateWishParams extends CreateWishParams {
  uuid: string
}

interface CompleteWishParams {
  uuid: string
  isDone: boolean
}

type FetchQueryParams = Record<string, string>

const api = rootApi.injectEndpoints({
  endpoints: (build) => ({
    fetchWishes: build.query<WishResponse[], { params?: FetchQueryParams }>({
      query: ({ params = {} }) => ({ url: `wishes/`, method: 'GET', params: params }),
      providesTags: ['WISH_LIST'],
    }),
    fetchWish: build.query<WishResponse, string | undefined>({
      query: (uuid) => ({ url: `wishes/${uuid}`, method: 'GET' }),
    }),
    createWish: build.mutation<void, CreateWishParams>({
      query: (params) => ({ url: 'wishes/', method: 'POST', body: params }),
      invalidatesTags: ['WISH_LIST'],
    }),
    updateWish: build.mutation<void, UpdateWishParams | CompleteWishParams>({
      query: (params) => ({
        url: `wishes/${params.uuid}`,
        method: 'PUT',
        body: params,
      }),
      invalidatesTags: ['WISH_LIST'],
    }),
    removeWish: build.mutation<void, string>({
      query: (uuid) => ({ url: `wishes/${uuid}`, method: 'DELETE' }),
      invalidatesTags: ['WISH_LIST'],
    }),
  }),
})

export const {
  useCreateWishMutation,
  useUpdateWishMutation,
  useFetchWishQuery,
  useFetchWishesQuery,
  useRemoveWishMutation,
} = api
