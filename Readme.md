## Setup process:

1) Install NodeJS via `nvm` or any other way.
2) Install Yarn package manager `npm install --global yarn`
3) Run `yarn install` to install dependencies.
4) Copy google oauth2 secret keys:
    - Go to https://console.cloud.google.com/apis/dashboard
    - Go to side menu bar "Credentials"
    - Select from "OAuth 2.0 Client IDs" your application or create those application credentials
    - Download credentials from the application page in "Additional information" (Client ID, Client secret e.t.c)
    - Move that file to folder `#{rootProjectFolder}/src/secrets`
5) Install recommended extensions in VS Code.


## Run

1) `yarn run dev` or `yarn run dev:debug` for VS code launch debug.
