const getGoogleAuthUrl = () => {
  const rootURL = process.env.REACT_APP_GOOGLE_OAUTH2_URI
  const options = {
    redirect_uri: process.env.REACT_APP_GOOGLE_OAUTH2_REDIRECT_URI as string,
    client_id: process.env.REACT_APP_GOOGLE_OAUTH2_CLIENT_ID as string,
    access_type: 'offline',
    response_type: 'code',
    prompt: 'consent',
    scope: [
      process.env.REACT_APP_GOOGLE_OAUTH2_EMAIL_SCOPE,
      process.env.REACT_APP_GOOGLE_OAUTH2_PROFILE_SCOPE,
    ].join(" ")
  }

  const qs = new URLSearchParams(options)

  return `${rootURL}?${qs.toString()}`
}

export default getGoogleAuthUrl
