import getGoogleAuthUrl from '../utils/getGoogleAuthUrl'
import { Link } from '@chakra-ui/react'

export const LoginLink = (): JSX.Element => {
  const loginUrl = getGoogleAuthUrl()

  return <Link href={loginUrl}>Login</Link>
}
