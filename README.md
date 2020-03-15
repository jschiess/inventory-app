# inventar-app

![image](https://assets.onthehub.com/attachments/15/33f270b9-b59b-e011-969d-0030487d8897/588f8b12-c253-4418-881f-b31480bdf58a.jpg "logo")

- [inventar-app](#inventar-app)
	- [Development mode](#development-mode)
		- [Requirements](#requirements)
		- [Frontend](#frontend)
		- [Backend](#backend)
			- [Helpful script](#helpful-script)
	- [Production mode](#production-mode)
		- [Requirements](#requirements-1)
		- [Restart container](#restart-container)
		- [Planned feature](#planned-feature)
		- [TODO](#todo)



## Development mode

### Requirements
 -**node.js** ( v10 or higher)

### Frontend

change directory to frontend 

```bash
> cd frontend
```
download the required dependencies
```bash
> npm i 
```

The vue-cli-service serve command starts a **dev server** (based on webpack-dev-server) that comes with Hot-Module-Replacement (HMR) working out of the box.
```bash
> npm run serve
```




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

Run the script to build the database
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

make sure no node_modules are installed anywhere
### Requirements

1. install docker
2. switch to production branch `git checkout `
3. run the command to build
(this will take a while the first time you run it)
```bash
> docker-compose build
```

4. Run the command to start the container 
```bash
> docker-compose up
```

5. To build the database 


### Restart container

to restart the container after closing it run `docker start -i inventar-app`. To run it detached remove the `-i` parameter

### Planned feature
-  reservations
-  graphql mutations
-  graphinserts
-  test


### TODO
- change port in api.js frontend to docker variable
- separate database from main container
-  expand database
