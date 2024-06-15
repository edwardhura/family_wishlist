import { Prisma } from '@prisma/client'
import { dbClient } from '../db/prismaClient'

export enum AvailableScopes {
  Family = 'family',
  FamilyUser = 'user',
}

interface WishesCreateAttributes {
  title: string
  priority: string
  comment?: string
  link?: string
  price?: number
  userUuid: string
}

interface WishesUpdateAttributes extends Omit<WishesCreateAttributes, 'userUuid'> {
  userUuid?: string
  isDone?: boolean
  uuid: string
}

interface WishesQueryParams {
  familyUuid?: string
  userUuid?: string
  isDone?: boolean
  scope: AvailableScopes
}

const wishListSelect = {
  uuid: true,
  priority: true,
  comment: true,
  title: true,
  link: true,
  price: true,
  isDone: true,
  userUuid: true,
} satisfies Prisma.WishSelect

interface ListQueryArgs {
  select: typeof wishListSelect
  where?: { userUuid?: string; isDone?: boolean; user?: { family: { uuid: string } } }
}

export const list = async (
  queryParams: WishesQueryParams,
): Promise<Prisma.WishGetPayload<{ select: typeof wishListSelect }>[] | null> => {
  const { wish } = dbClient
  const { familyUuid, isDone = false, scope = AvailableScopes.FamilyUser, userUuid } = queryParams

  let listQuery: ListQueryArgs = { select: wishListSelect }
  switch (scope) {
    case AvailableScopes.Family: {
      if (familyUuid) {
        listQuery = {
          ...listQuery,
          where: { user: { family: { uuid: familyUuid } }, isDone },
        }
      }
      break
    }
    case AvailableScopes.FamilyUser: {
      listQuery = { ...listQuery, where: { userUuid, isDone } }
      break
    }
    default:
      throw Error('Not available scope')
  }

  const wishListRecords = await wish.findMany(listQuery)
  return wishListRecords
}

export const find = async (uuid: string): Promise<Prisma.WishGetPayload<{ select: typeof wishListSelect }> | null> => {
  const { wish } = dbClient

  const wishRecord = await wish.findFirst({ where: { uuid }, select: wishListSelect })
  return wishRecord
}

export const create = async (
  wishParams: WishesCreateAttributes,
): Promise<Prisma.WishGetPayload<{ select: typeof wishListSelect }> | null> => {
  const { wish } = dbClient
  const wishRecord = await wish.create({ data: wishParams, select: wishListSelect })
  return wishRecord
}

export const update = async (
  wishParams: WishesUpdateAttributes,
): Promise<Prisma.WishGetPayload<{ select: typeof wishListSelect }> | null> => {
  const { wish } = dbClient
  const wishRecord = await wish.update({
    where: { uuid: wishParams.uuid },
    data: wishParams,
    select: wishListSelect,
  })
  return wishRecord
}

export const destroy = async (
  uuid: string,
): Promise<Prisma.WishGetPayload<{ select: typeof wishListSelect }> | null> => {
  const { wish } = dbClient
  return wish.delete({ where: { uuid } })
}
