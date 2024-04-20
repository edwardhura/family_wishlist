import { Prisma } from '@prisma/client'
import { dbClient } from '../db/prismaClient'

export enum AvailableScopes {
  Family = 'family',
  FamilyUser = 'user',
}

interface WishesQueryParams {
  familyUuid?: string
  userUuid?: string
  isDone?: boolean
  scope: AvailableScopes
}

interface WishesCreateAttributes {
  title: string
  priority: string
  comment?: string
  link?: string
  price?: number
  userUuid: string
}

interface WishesUpdateAttributes extends WishesCreateAttributes {
  isDone?: boolean
  uuid: string
}

const wishSelect: Prisma.WishSelect = {
  uuid: true,
  priority: true,
  comment: true,
  title: true,
  link: true,
  price: true,
  isDone: true,
}

interface ListQueryArgs {
  select: typeof wishSelect
  where?: { userUuid?: string; isDone?: boolean; user?: { family: { uuid: string } } }
}

export const list = async (queryParams: WishesQueryParams) => {
  const { wish } = dbClient
  const { familyUuid, isDone = false, scope = AvailableScopes.FamilyUser, userUuid } = queryParams

  let listQuery: ListQueryArgs = { select: wishSelect }
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

  return wish.findMany(listQuery)
}

export const find = async (uuid: string) => {
  const { wish } = dbClient

  return wish.findFirst({ where: { uuid }, select: wishSelect })
}

export const create = async (wishParams: WishesCreateAttributes) => {
  const { wish } = dbClient
  return wish.create({ data: wishParams, select: wishSelect })
}

export const update = async (wishParams: WishesUpdateAttributes) => {
  const { wish } = dbClient
  return wish.update({
    where: { uuid: wishParams.uuid },
    data: wishParams,
    select: wishSelect,
  })
}

export const destroy = async (uuid: string) => {
  const { wish } = dbClient
  return wish.delete({ where: { uuid } })
}
