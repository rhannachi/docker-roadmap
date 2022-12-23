

### Prérequis
```
# mkdir -p /var/voting-app/postgresql/data
# mkdir -p /var/voting-app/rabbitmq/log
# mkdir -p /var/voting-app/rabbitmq/data
```

### Lancer le projet
```
$ docker-compose up --build
```

### Clean
```
$ docker container rm $(docker container ps -aq)
$ docker image rm -f $(docker image ls | grep voting-app)
```