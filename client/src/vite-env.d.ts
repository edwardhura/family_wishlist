/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GOOGLE_OAUTH2_URI: string
  readonly VITE_GOOGLE_OAUTH2_CLIENT_ID: string
  readonly VITE_GOOGLE_OAUTH2_REDIRECT_URI: string
  readonly VITE_GOOGLE_OAUTH2_EMAIL_SCOPE: string
  readonly VITE_GOOGLE_OAUTH2_PROFILE_SCOPE: string
  readonly VITE_SERVER_HOST: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
