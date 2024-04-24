import { rootApi } from 'rootApi'
import { Priority } from 'types'
import { WishesAvailableScopes } from 'types/scopes'

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

interface FetchQueryParams {
  isDone?: string
  scope?: WishesAvailableScopes
  userUuid?: string
}

const api = rootApi.injectEndpoints({
  endpoints: (build) => ({
    fetchWishes: build.query<WishResponse[], { params?: FetchQueryParams }>({
      query: ({ params }) => ({
        url: `wishes/`,
        method: 'GET',
        params: params,
      }),
      providesTags: (result) =>
        result?.length
          ? [...result.map(({ uuid }) => ({ type: 'Wish' as const, id: uuid })), { type: 'Wish', id: 'LIST' }]
          : [{ type: 'Wish', id: 'LIST' }],
    }),
    fetchWish: build.query<WishResponse, string | undefined>({
      query: (uuid) => ({ url: `wishes/${uuid}`, method: 'GET' }),
      providesTags: (_result, _error, uuid) => [{ type: 'Wish', id: uuid }],
    }),
    createWish: build.mutation<WishResponse, CreateWishParams>({
      query: (params) => ({ url: 'wishes/', method: 'POST', body: params }),
      invalidatesTags: [{ type: 'Wish', id: 'LIST' }],
    }),
    updateWish: build.mutation<WishResponse, UpdateWishParams | CompleteWishParams>({
      query: (params) => ({
        url: `wishes/${params.uuid}`,
        method: 'PUT',
        body: params,
      }),
      invalidatesTags: (_result, _error, args) => [{ type: 'Wish', id: args.uuid }],
    }),
    removeWish: build.mutation<void, string>({
      query: (uuid) => ({ url: `wishes/${uuid}`, method: 'DELETE' }),
      invalidatesTags: [{ type: 'Wish', id: 'LIST' }],
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
