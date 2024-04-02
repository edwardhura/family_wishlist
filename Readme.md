## Setup process:

1) Install NodeJS via `nvm` or any other way.
2) Install Yarn package manager `npm install --global yarn`
3) Run `yarn install` to install dependencies.
4) Copy google oauth2 secret keys:
    - Go to https://console.cloud.google.com/apis/dashboard
    - Go to side menu bar "Credentials"
    - Select from "OAuth 2.0 Client IDs" your application or create those application credentials (use `REDIRECT_URL="/api/sessions/oauth/google"`)
    - Download credentials from the application page in "Additional information" (Client ID, Client secret e.t.c)
    - Use credentials to fill in `.env.${process.env.NODE_ENV}` file
        `.env.${process.env.NODE_ENV}` FILE:
        ```
            GOOGLE_OAUTH2_CLIENT_ID="<USE YOUR CLIENT ID>"
            GOOGLE_OAUTH2_CLIENT_SECRET="<USE YOUR CLIENT SECRET>"
            GOOGLE_OAUTH2_REDIRECT_URL="http://localhost:8000/api/sessions/oauth/google"
            GOOGLE_OAUTH2_TOKEN_URL="https://accounts.google.com/o/oauth2/token"
            GOOGLE_OAUTH2_USERINFO_URL="https://www.googleapis.com/oauth2/v1/userinfo"
        ```
        `${projectRootFolder}/client/.env.${process.env.NODE_ENV}` FILE:
        ```
            REACT_APP_GOOGLE_OAUTH2_URI="https://accounts.google.com/o/oauth2/v2/auth"
            REACT_APP_GOOGLE_OAUTH2_CLIENT_ID="<USE YOUR CLIENT ID>"
            REACT_APP_GOOGLE_OAUTH2_REDIRECT_URI="http://localhost:8000/api/sessions/oauth/google"
            REACT_APP_GOOGLE_OAUTH2_EMAIL_SCOPE="https://www.googleapis.com/auth/userinfo.email"
            REACT_APP_GOOGLE_OAUTH2_PROFILE_SCOPE="https://www.googleapis.com/auth/userinfo.profile"
        ```
5) Install recommended extensions in VS Code.


## Run

1) `yarn run dev` or `yarn run dev:debug` for VS code launch debug.
