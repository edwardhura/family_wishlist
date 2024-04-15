import { Prisma } from '@prisma/client'
import { dbClient } from '../db/prismaClient'
import { verifyJwt, signJwt } from '../libs'
import { find as findUser } from './usersService'

const sessionSelect: Prisma.SessionSelect = {
  userUuid: true,
  valid: true,
  userAgent: true,
}

export const upsertSession = async ({
  userUuid,
  userAgent,
  valid,
}: {
  userUuid: string
  userAgent: string
  valid?: boolean
}) => {
  const { session } = dbClient
  return session.upsert({
    where: { userUuid },
    create: { userUuid, valid, userAgent },
    update: { userAgent, valid, updatedAt: new Date() },
  })
}

export const reIssueAccessToken = async ({
  refreshToken,
}: {
  refreshToken: string
}): Promise<string | boolean> => {
  if (!refreshToken) return false

  const { decoded } = verifyJwt(refreshToken)

  if (
    !decoded ||
    typeof decoded === 'string' ||
    (typeof decoded === 'object' && !decoded.session)
  ) {
    return false
  }
  const { session: sessionClient } = dbClient
  const session = await sessionClient.findUnique({
    where: { userUuid: decoded.uuid },
    select: sessionSelect,
  })

  if (!session || !session.valid) return false

  const user = await findUser(decoded.uuid)

  if (!user) return false

  const accessToken = signJwt(
    { ...user, session },
    { expiresIn: process.env.ACCESS_TOKEN_TTL }, // 15 minutes
  )

  return accessToken
}
