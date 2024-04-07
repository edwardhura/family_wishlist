import getGoogleAuthUrl from '../utils/getGoogleAuthUrl'
import { Link } from '@chakra-ui/react'

export const LoginLink = () => {
  const loginUrl = getGoogleAuthUrl()

  return (
    <Link href={loginUrl}>
      Login
    </Link>
  )
}
