import { dbClient } from "../db/prismaClient"

interface UserCreateAttributes {
  email: string
  name?: string
  googleId: string
  avatar?: string
}

export const upsert = async (userParams: UserCreateAttributes) => {
  const { user } = dbClient
  return user.upsert({where: { email: userParams.email }, create: userParams, update: userParams})
}

export const find = async (uuid: string) => {
  const { user } = dbClient
  return user.findUnique({where: { uuid }})
}
