import { PrismaClient } from '@prisma/client'
import { logger } from '../libs'

logger.info('Init DB client')
export const dbClient = new PrismaClient()
