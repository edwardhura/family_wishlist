import { Currency } from 'types'

export const formatPrice = (price: number, currency: Currency = Currency.UAH): string =>
  price ? `${price} ${currency}` : `- ${currency}`
