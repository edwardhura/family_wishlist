import { PrismaClient } from '@prisma/client'
import { logger } from '../libs'

logger.info('Init DB client')
export const dbClient = new PrismaClient({
  log: [
    {
      emit: 'event',
      level: 'query',
    },
  ],
})

dbClient.$on('query', async (e) => {
  logger.info(`${e.query} ${e.params}`)
})
