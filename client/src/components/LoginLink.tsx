import getGoogleAuthUrl from '../utils/getGoogleAuthUrl'

export const LoginLink = () => {
  const loginUrl = getGoogleAuthUrl()

  return (
    <a className="App-link" href={loginUrl}>
      Login
    </a>
  )
}
