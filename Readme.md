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
            NODE_ENV=production # for prod
            GOOGLE_OAUTH2_CLIENT_ID="<USE YOUR CLIENT ID>"
            GOOGLE_OAUTH2_CLIENT_SECRET="<USE YOUR CLIENT SECRET>"
            GOOGLE_OAUTH2_REDIRECT_URL="http://localhost:8000/api/sessions/oauth/google" # <USE YOUR REDIRECT URL>
            GOOGLE_OAUTH2_TOKEN_URL="https://accounts.google.com/o/oauth2/token"
            GOOGLE_OAUTH2_USERINFO_URL="https://www.googleapis.com/oauth2/v1/userinfo"
            SQLITE_DATABASE_URL="file:./dev.db"
            ORIGIN='http://localhost:3000'
            PORT='8000'
            DOMAIN='localhost'
            ACCESS_TOKEN_TTL='15m'
            REFRESH_TOKEN_TTL='1y'
            RSA_PRIVATE_KEY="<GENERATED RSA PRIVATE>"
            RSA_PUBLIC_KEY="<GENERATED RSA PUBLIC>"
        ```
        `${projectRootFolder}/client/.env.${process.env.NODE_ENV}` FILE:
        ```
            VITE_GOOGLE_OAUTH2_URI="https://accounts.google.com/o/oauth2/v2/auth"
            VITE_GOOGLE_OAUTH2_CLIENT_ID="<USE YOUR CLIENT ID>"
            VITE_GOOGLE_OAUTH2_REDIRECT_URI="http://localhost:8000/api/sessions/oauth/google"  # <USE YOUR REDIRECT URL>
            VITE_GOOGLE_OAUTH2_EMAIL_SCOPE="https://www.googleapis.com/auth/userinfo.email"
            VITE_GOOGLE_OAUTH2_PROFILE_SCOPE="https://www.googleapis.com/auth/userinfo.profile"
            VITE_SERVER_HOST="http://localhost:8000"
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


## Server setup (RPi5 with ubuntu server)
`server` - server user
1) Create user under root (switch on root - `sudo -s`): `adduser server`
2) Give user SUDO permissions: `sudo usermod -aG sudo server`
3) Generate server SSH and add SSH Key to Github white list.
4) Install Node and yarn.
5) Pull files from GIT.
6) Install NGINX - `sudo apt-get install nginx`
7) Run `yarn install` in `client` and `server`
8) Backend SERVER setup:
    - Install PM2 `npm install pm2 -g` (process manager)
    - Build server: `yarn build`. Start PM2 process in `/server` folder: `pm2 start yarn --name server -- server`. Add ubuntu startup launcher: `pm2 startup`
    - Setup DB:
        - Run first time - `yarn prisma:prod db push`
9) Frontend client setup:
    - Build `yarn build`
    - Copy static files: `sudo cp -r build/ /usr/share/nginx/html`
10) Final NGINX entry point setup:
    ```
    $ cd /etc/nginx/
    $ sudo cp nginx.conf nginx.conf.backup
    $ sudo nano nginx.conf 
    $ cd ~/family_wishlist/client
    $ sudo cp -r build/* /usr/share/nginx/html
    $ sudo service nginx restart
    ```


## NGINX Config

```
    user server;
    worker_processes    auto;

    events { worker_connections 1024; }

    http {
        server {
            server_tokens off;

            listen  2000;
            root    /usr/share/nginx/html;
            include /etc/nginx/mime.types;

            location / {
                try_files $uri $uri/ /index.html;
            }

            gzip            on;
            gzip_vary       on;
            gzip_http_version  1.0;
            gzip_comp_level 5;
            gzip_types
                            application/atom+xml
                            application/javascript
                            application/json
                            application/rss+xml
                            application/vnd.ms-fontobject
                            application/x-font-ttf
                            application/x-web-app-manifest+json
                            application/xhtml+xml
                            application/xml
                            font/opentype
                            image/svg+xml
                            image/x-icon
                            text/css
                            text/plain
                            text/x-component;
            gzip_proxied    no-cache no-store private expired auth;
            gzip_min_length 256;
            gunzip          on;
        }
    }
```
