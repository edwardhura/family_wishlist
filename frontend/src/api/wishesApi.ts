import { rootApi } from 'rootApi'

interface WishResponse {
  uuid: string
  title: string
  comment: string
  priority: string
  link: string
  price: number
}

interface CreateWishParams {
  title: string
  comment: string
  priority: string
  link: string
  price: number
}

interface UpdateWishParams extends CreateWishParams {
  uuid: string
}

const api = rootApi.injectEndpoints({
  endpoints: (build) => ({
    fetchWishes: build.query<WishResponse[], void>({
      query: () => ({ url: `wishes/`, method: 'GET' }),
      providesTags: ['WISH_LIST'],
    }),
    fetchWish: build.query<WishResponse, string | undefined>({
      query: (uuid) => ({ url: `wishes/${uuid}`, method: 'GET' }),
    }),
    createWish: build.mutation<void, CreateWishParams>({
      query: (params) => ({ url: 'wishes/', method: 'POST', params }),
      invalidatesTags: ['WISH_LIST'],
    }),
    updateWish: build.mutation<void, UpdateWishParams>({
      query: (params) => ({
        url: `wishes/${params.uuid}`,
        method: 'PUT',
        params,
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
