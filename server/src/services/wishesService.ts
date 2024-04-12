import { Prisma } from '@prisma/client'
import { dbClient } from '../db/prismaClient'

interface WishesQueryParams {
  userUuid: string
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
  uuid: string
}

const wishSelect: Prisma.WishSelect = {
  uuid: true,
  priority: true,
  comment: true,
  title: true,
  link: true,
  price: true,
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

export const list = async (queryParams: WishesQueryParams) => {
  const { wish } = dbClient
  const { userUuid } = queryParams

  return wish.findMany({ where: { userUuid }, select: wishSelect })
}

export const find = async (uuid: string) => {
  const { wish } = dbClient

  return wish.findFirst({ where: { uuid }, select: wishSelect })
}
