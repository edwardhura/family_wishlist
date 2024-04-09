import { Prisma } from '@prisma/client'
import { dbClient } from '../db/prismaClient'

interface UserCreateAttributes {
  email: string
  name?: string
  googleId: string
  avatar?: string
}

const userSelect: Prisma.UserSelect = {
  uuid: true,
  email: true,
  name: true,
  avatar: true,
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
