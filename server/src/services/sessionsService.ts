import { dbClient } from "../db/prismaClient"


export const upsertSession = async ({ userUuid, userAgent, valid } : {userUuid: string, userAgent: string, valid: boolean}) => {
  const { session } = dbClient
  return session.upsert({where: { userUuid }, create: { userUuid, valid, userAgent }, update: { userAgent, valid, updatedAt: new Date() }})
}
