import { Prisma } from '@prisma/client'
import { dbClient } from '../db/prismaClient'

interface WishesQueryParams {
  userUuid?: string
  isDone?: boolean
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

export const list = async (queryParams: WishesQueryParams) => {
  const { wish } = dbClient
  const { userUuid, isDone = false } = queryParams

  return wish.findMany({ where: { userUuid, isDone }, select: wishSelect })
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
