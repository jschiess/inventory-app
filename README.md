# inventar-app

![image](https://assets.onthehub.com/attachments/15/33f270b9-b59b-e011-969d-0030487d8897/588f8b12-c253-4418-881f-b31480bdf58a.jpg "logo")

- [inventar-app](#inventar-app)
	- [Development mode](#development-mode)
		- [Dependencies](#dependencies)
		- [Frontend](#frontend)
		- [Backend](#backend)
	- [Production mode](#production-mode)
		- [Restart container](#restart-container)
		- [Planned feature](#planned-feature)
		- [TODO](#todo)



## Development mode
the application is separated in API and frontend

### Dependencies
  - ##### node.js v^10
  - ##### mysql v^8
### Frontend
to start the frontend in development mode you must first have node installed first 

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

currently the Database is in sqlite3 and is recreated by knex
change directory to /API
```bash
> cd API
```
run the script to build the database

```bash
> npm run build
```
run the command to 

## Production mode

make sure no node_modules are installed anywhere

1. install docker
2. clone from github
3. switch to production branch `git checkout production`
4. run the command to build
```bash
> docker build -t kek .
```
5. Run the command to start the container 
```bash
> docker run -it --name inventar-app -p 9000:3000 kek 
 ```

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
