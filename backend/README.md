## Setting up environment for development

At this early sage in development a docker instance has not been generated, so individual dependencies will need to be installed.

### Install node.js

#### linux:

Run the following command in the command line: `sudo apt install nodejs`

#### windows:

### Installing MongoDB

#### linux:

## Development

Before you can run the project you will need to create a .env file and populate it with development specific information. The current required information is:

- PORT

**THIS FILE SHOULD NOT BE COMMITED TO GIT TO AVOID SENSITIVE INFORMATION ENTERING VERSION CONTROL**

### starting the project for development

`npm start`

### building the project

`npm run build` will run all development tests and produce a bundled .js file which can be found in the 'dist' folder.

### generating a new auth token

create a new post request which includes the following JSON body ``` {title: <memorable title>, privilages: "['visitor', 'admin'], expiresIn: <days - optional>} ```

add basic authentication with username and password (saved on onepass)

### generating a client cert and client key

openssl genrsa -out client-key.pem 2048 && openssl req -new -key client-key.pem -out client.csr && openssl x509 -req -in client.csr -signkey client-key.pem -out client-cert.pem

### edit server config file

sudo nano /etc/nginx/sites-available/default

### restart server code after pull

sudo systemctl reload nginx
sudo pm2 restart 0