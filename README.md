# inventar-app

## production mode
1. install docker
2. switch to production branch `git checkout production`
3. run the comand on the terminal ```docker build -t docker-inventory app```
4. run the command ```docker run -it =p 9000:3000 docker-inventor app```

the app will run on the port specified in the command 