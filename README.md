# inventar-app

## development mode

### Frontend
to start the frontend in developer mode 
change directory to the frontend 

```bash
> cd frontend
```
The vue-cli-service serve command starts a dev server (based on webpack-dev-server) that comes with Hot-Module-Replacement (HMR) working out of the box.
```bash
> npm run serve
```


### Backend

currently the Database is in sqlite3 and is build with the 

## production mode

make sure no node modules are installed in the directory

1. install docker
2. clone from github
3. switch to production branch `git checkout production`
4. run the command on the terminal ```docker build -t kek```
5. run the command ```docker run -it --name inventar-app -p 9000:3000 kek ```

### restart container

to restart the container after closing it run `docker start -i inventar-app`. To run it detached remove the `-i` parameter


### new feature
-  reservations
-  graphql mutations
-  graphinserts
-  test


### TODO:
- change port in api.js frontend to docker variable
- separate database from main container
-  expand database
