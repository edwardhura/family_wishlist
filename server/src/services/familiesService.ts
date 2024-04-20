import { Prisma } from '@prisma/client'
import { dbClient } from '../db/prismaClient'
import { randomBytes } from 'crypto'
import dayjs from 'dayjs'

const familySelect = {
  uuid: true,
  name: true,
} satisfies Prisma.FamilySelect

const inviteTokenSelect = {
  inviteToken: true,
} satisfies Prisma.FamilySelect

interface FamilyCreateAttributes {
  name: string
  userUuid: string
}

interface FamilyUpdateAttributes {
  uuid: string
  name?: string
  userUuid?: string
  inviteToken?: string
}

export const find = async (uuid: string): Promise<Prisma.FamilyGetPayload<{ select: typeof familySelect }> | null> => {
  const { family } = dbClient

  const familyRecord = await family.findFirst({
    where: { uuid },
    select: familySelect,
  })

  return familyRecord
}

export const create = async ({
  userUuid,
  ...data
}: FamilyCreateAttributes): Promise<Prisma.FamilyGetPayload<{ select: typeof familySelect }>> => {
  const { family } = dbClient

  const familyRecord = await family.create({
    data: { ...data, members: { connect: { uuid: userUuid } } },
    select: familySelect,
  })
  return familyRecord
}

export const update = async ({
  uuid,
  userUuid,
  ...data
}: FamilyUpdateAttributes): Promise<Prisma.FamilyGetPayload<{ select: typeof familySelect }>> => {
  const { family } = dbClient
  const familyRecord = await family.update({
    where: { uuid },
    data: { ...data, members: { connect: { uuid: userUuid } } },
    select: familySelect,
  })

  return familyRecord
}

export const generateToken = async (
  uuid: string,
): Promise<Prisma.FamilyGetPayload<{ select: typeof inviteTokenSelect }>> => {
  const { family } = dbClient

  const inviteToken = randomBytes(64).toString('hex')
  const inviteTokenExpiredAt = dayjs().add(15, 'minutes').format()

  const familyRecord = await family.update({
    where: { uuid },
    data: { inviteToken, inviteTokenExpiredAt },
    select: inviteTokenSelect,
  })

  return familyRecord
}
