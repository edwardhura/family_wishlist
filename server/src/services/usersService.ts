import { Prisma } from '@prisma/client'
import { dbClient } from '../db/prismaClient'

export enum AvailableScopes {
  Family = 'family',
}

interface UserCreateAttributes {
  email: string
  name: string
  googleId: string
  avatar?: string
}

const userSelect: Prisma.UserSelect = {
  uuid: true,
  email: true,
  name: true,
  avatar: true,
  familyUuid: true,
}

interface UserListAttributes {
  scope: AvailableScopes
}

export const upsert = async (userParams: UserCreateAttributes) => {
  const { user } = dbClient
  return user.upsert({
    where: { email: userParams.email },
    create: userParams,
    update: userParams,
  })
}

export const find = async (uuid: string) => {
  const { user } = dbClient
  return user.findUnique({ where: { uuid }, select: userSelect })
}

export const list = async (params: UserListAttributes) => {
  const { user } = dbClient
  const { scope } = params
  const where = {}

  switch (scope) {
    case AvailableScopes.Family: {
      where
      break
    }
    default:
      throw Error('Not available scope')
  }

  return user.findMany({ where, select: userSelect })
}
