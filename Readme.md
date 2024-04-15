## Setup process:

1) Install NodeJS via `nvm` or any other way.
2) Install Yarn package manager `npm install --global yarn`
3) Run `yarn install` to install dependencies.
4) Copy google oauth2 secret keys:
    - Go to https://console.cloud.google.com/apis/dashboard
    - Go to side menu bar "Credentials"
    - Select from "OAuth 2.0 Client IDs" your application or create those application credentials (use `REDIRECT_URL="/api/sessions/oauth/google"`)
    - Download credentials from the application page in "Additional information" (Client ID, Client secret e.t.c)
    - Use credentials to fill in `${projectRootFolder}/server/.env.${process.env.NODE_ENV}` file
        `.env.${process.env.NODE_ENV}` FILE:
        ```
            GOOGLE_OAUTH2_CLIENT_ID="<USE YOUR CLIENT ID>"
            GOOGLE_OAUTH2_CLIENT_SECRET="<USE YOUR CLIENT SECRET>"
            GOOGLE_OAUTH2_REDIRECT_URL="http://localhost:8000/api/sessions/oauth/google"
            GOOGLE_OAUTH2_TOKEN_URL="https://accounts.google.com/o/oauth2/token"
            GOOGLE_OAUTH2_USERINFO_URL="https://www.googleapis.com/oauth2/v1/userinfo"
            SQLITE_DATABASE_URL="file:./dev.db"
            ORIGIN='http://localhost:3000'
            PORT='8000'
            ACCESS_TOKEN_TTL='15m'
            REFRESH_TOKEN_TTL='1y'
            RSA_PRIVATE_KEY="<GENERATED RSA PRIVATE>"
            RSA_PUBLIC_KEY="<GENERATED RSA PUBLIC>"
        ```
        `${projectRootFolder}/client/.env.${process.env.NODE_ENV}` FILE:
        ```
            VITE_GOOGLE_OAUTH2_URI="https://accounts.google.com/o/oauth2/v2/auth"
            VITE_GOOGLE_OAUTH2_CLIENT_ID="<USE YOUR CLIENT ID>"
            VITE_GOOGLE_OAUTH2_REDIRECT_URI="http://localhost:8000/api/sessions/oauth/google"
            VITE_GOOGLE_OAUTH2_EMAIL_SCOPE="https://www.googleapis.com/auth/userinfo.email"
            VITE_GOOGLE_OAUTH2_PROFILE_SCOPE="https://www.googleapis.com/auth/userinfo.profile"
        ```
5) Run dev migrations with `yarn migration:dev`
6) Install recommended extensions in VS Code.


## Run

1) Server: `yarn run dev` or `yarn run dev:debug` for VS code launch debug.
2) Client: `yarn run dev`.
3) Linter helper commands:
    - Server: `yarn prettier . --write`
    - Client: `yarn lint`, `yarn prettier`
4) Helper commands:
    - Server DB client: `yarn prisma:cli` - development env CLI.
