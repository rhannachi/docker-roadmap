
### Lancer le projet
```
$ docker-compose up --build
```

### Clean
```
$ docker image rm -f voting-app_api
$ docker container rm $(docker container ps -aq)
```