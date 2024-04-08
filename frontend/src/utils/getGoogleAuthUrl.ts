const getGoogleAuthUrl = () => {
  const rootURL = import.meta.env.VITE_GOOGLE_OAUTH2_URI
  const options = {
    redirect_uri: import.meta.env.VITE_GOOGLE_OAUTH2_REDIRECT_URI,
    client_id: import.meta.env.VITE_GOOGLE_OAUTH2_CLIENT_ID,
    access_type: 'offline',
    response_type: 'code',
    prompt: 'consent',
    scope: [
      import.meta.env.VITE_GOOGLE_OAUTH2_EMAIL_SCOPE,
      import.meta.env.VITE_GOOGLE_OAUTH2_PROFILE_SCOPE,
    ].join(' '),
  }

  const qs = new URLSearchParams(options)

  return `${rootURL}?${qs.toString()}`
}

export default getGoogleAuthUrl
