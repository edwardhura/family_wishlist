import { rootApi } from 'rootApi'
import { navigate } from 'utils/navigation'

const api = rootApi.injectEndpoints({
  endpoints: (build) => ({
    removeSession: build.mutation<{ success: boolean }, void>({
      query: () => ({ url: '/sessions/', method: 'DELETE' }),
      invalidatesTags: [{ type: 'User', id: 'ME' }],
      onQueryStarted: async (_, { queryFulfilled }) => {
        try {
          await queryFulfilled
          void navigate('/login')
        } catch (_error) {
          void navigate('/login')
        }
      },
    }),
  }),
})

export const { useRemoveSessionMutation } = api
