
![image](https://assets.onthehub.com/attachments/15/33f270b9-b59b-e011-969d-0030487d8897/588f8b12-c253-4418-881f-b31480bdf58a.jpg "logo")

- [Development mode](#development-mode)
	- [Requirements](#requirements)
	- [Frontend](#frontend)
	- [Backend](#backend)
		- [Helpful script](#helpful-script)
- [Production mode](#production-mode)
	- [Requirements](#requirements-1)
	- [Planned feature](#planned-feature)
	- [TODO](#todo)
	- [issues](#issues)



## Development mode

### Requirements
 -**node.js** ( v10 or higher)

### Frontend

Change directory to frontend 

```bash
> cd frontend
```
Download the required dependencies
```bash
> npm i 
```

The vue-cli-service serve command starts a **dev server** (based on webpack-dev-server) that comes with Hot-Module-Replacement (HMR) working out of the box.
```bash
> npm run serve
```
server will run on http://localhost:8080

### Backend

In development mode the Database is in sqlite3 and is recreated by knex
change directory to /API
```bash
> cd API
```

download the required dependencies
```bash
> npm i
```

Run the script to build the database in Development mode. It uses Sqlite3. In production Mysql is used
```bash
> npm run build-dev
```

start the application
```bash
> npm run start-dev
```

#### Helpful script

will start a node in the terminal, on which you can run knex queries to the database for testing.
```bash
> npm run testing
```

***Examples**:*
```js
> await knex('users')
[
  RowDataPacket {
    PK_users_ID: 1,
    firstname: 'josiah',
    lastname: 'schiess',
    username: 'scjo',
    password: '$2a$10$bYdZkrwXv7ndWutSTGf0IeUzr9NzE9C//d.tI9L/n88R0YEVACmQG',
    FK_roles_ID: 1
  }
]
```
Get the raw sql request
```js
> knex('roles').toString()
'select * from `roles`'
```

## Production mode

### Requirements

1. Install docker
2. Switch to master branch `git checkout master `
3. Run the command to build
(this will take a while the first time you run it)
```bash
> docker-compose build
```
4. Run the command to start the container 
```bash
> docker-compose up
```
5. From the terminal run the command 
This will build the database in mysql and insert Dummydata
```bash
> docker exec -it inventory-API run build-pro
```
1. Connect to http://localhost

### Planned feature
-  reservations
-  graphql mutations
-  graphinserts
-  socket io

### TODO
-  expand database
-  Testing

### issues
1. the login messages displayed are not working properly 