import { Prisma } from '@prisma/client'
import { dbClient } from '../db/prismaClient'
import { logger } from '../libs'

export enum AvailableScopes {
  Family = 'family',
}

interface UserUpsertAttributes {
  email: string
  name: string
  googleId: string
  avatar?: string
  inviteToken?: string
  family?: { connect: { uuid: string } }
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

interface UserUpsertAvailableOptions {
  withFamilyConnect: boolean
}

export const upsert = async (userParams: UserUpsertAttributes, options: UserUpsertAvailableOptions) => {
  const { user } = dbClient
  const { inviteToken, ...restUserParams } = userParams
  const userQuery = { where: { email: restUserParams.email }, create: restUserParams, update: restUserParams }

  if (options.withFamilyConnect) {
    const { family } = dbClient
    const familyRecord = await family.findFirst({ where: { inviteToken } })
    const canBeInvited =
      familyRecord?.inviteTokenExpiredAt && new Date(familyRecord?.inviteTokenExpiredAt) >= new Date()

    if (canBeInvited) {
      userQuery.create = { ...userQuery.create, family: { connect: { uuid: familyRecord.uuid } } }
      userQuery.update = { ...userQuery.update, family: { connect: { uuid: familyRecord.uuid } } }
    } else {
      logger.warn('Invitation Token is expired or non valid')
    }
  }

  return user.upsert(userQuery)
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
