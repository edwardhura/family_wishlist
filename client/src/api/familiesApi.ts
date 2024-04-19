import { rootApi } from 'rootApi'

interface FamilyResponse {
  uuid: string
  name: string
}

interface FamilyInviteTokenResponse {
  inviteToken: string
}

const api = rootApi.injectEndpoints({
  endpoints: (build) => ({
    fetchFamily: build.query<FamilyResponse, string | undefined>({
      query: (uuid) => ({ url: `/families/${uuid}` }),
    }),
    createFamily: build.mutation<FamilyResponse, { name: string }>({
      query: (params) => ({ url: '/families/', method: 'POST', body: params }),
    }),
    updateFamily: build.mutation<FamilyResponse, { uuid: string; name: string }>({
      query: ({ uuid, ...params }) => ({ url: `/families/${uuid}`, method: 'PUT', body: params }),
    }),
    generateFamilyToken: build.mutation<FamilyInviteTokenResponse, string>({
      query: (uuid) => ({ url: `/families/${uuid}/generateToken`, method: 'PATCH' }),
    }),
  }),
})

export const { useFetchFamilyQuery, useCreateFamilyMutation, useUpdateFamilyMutation, useGenerateFamilyTokenMutation } =
  api
