interface GoogleAuthUrlOptions {
  redirect_uri: string
  client_id: string
  access_type: string
  response_type: string
  prompt: string
  scope: string
  state?: string
}

interface AvailableStates {
  familyInviteToken?: string
}

const getGoogleAuthUrl = ({ state }: { state?: AvailableStates } = {}): string => {
  const rootURL = import.meta.env.VITE_GOOGLE_OAUTH2_URI
  const options: GoogleAuthUrlOptions = {
    redirect_uri: import.meta.env.VITE_GOOGLE_OAUTH2_REDIRECT_URI,
    client_id: import.meta.env.VITE_GOOGLE_OAUTH2_CLIENT_ID,
    access_type: 'offline',
    response_type: 'code',
    prompt: 'consent',
    scope: [import.meta.env.VITE_GOOGLE_OAUTH2_EMAIL_SCOPE, import.meta.env.VITE_GOOGLE_OAUTH2_PROFILE_SCOPE].join(' '),
  }

  if (state) {
    options.state = btoa(JSON.stringify(state))
  }

  const qs = new URLSearchParams({ ...options })

  return `${rootURL}?${qs.toString()}`
}

export default getGoogleAuthUrl
