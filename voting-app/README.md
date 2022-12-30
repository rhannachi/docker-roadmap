
## Architecture

- front-api: front-end permettant à un utilisateur de voter.
- api: back-end réceptionnant les votes.
- front-socket: front-end permettant de visualiser les résultats.
- socket: back-end mettant à disposition les résultats
- db: database dans laquelle sont stockés les votes
- rabbitmq: broker de messagerie qui récupère les votes depuis api et transmet les résultats à la partie socket.

![architecture](./architecture.png)

```
├── docker-compose.yml
├── api
│   ├── API-voting.postman_collection.json
│   ├── app
│   ├── Dockerfile
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
├── front-api
│   ├── Dockerfile
│   ├── package.json
│   ├── package-lock.json
│   ├── public
│   └── src
├── front-socket
│   ├── Dockerfile
│   ├── package.json
│   ├── package-lock.json
│   ├── public
│   └── src
└── socket
    ├── Dockerfile
    ├── package.json
    ├── package-lock.json
    └── server.js

```

### Prérequis
```
# mkdir -p /var/voting-app/postgresql/data
# mkdir -p /var/voting-app/rabbitmq/log
# mkdir -p /var/voting-app/rabbitmq/data
```

### Lancer le projet (En mode Dev)
```
$ docker-compose up --force-recreate --build
```

[//]: # (### Clean)
[//]: # (```)
[//]: # ($ docker container rm $&#40;docker container ps -aq&#41;)
[//]: # ($ docker image rm -f $&#40;docker image ls | grep voting-app&#41;)
[//]: # (```)


### Lancer le projet (En mode Production)

Build project
``` 
$ docker-compose -f docker-compose-prod.yml build
```

Push DockerHub
```
$ docker-compose -f docker-compose-prod.yml push
```

Nous pouvons initialiser le swarm
```
$ docker swarm init --advertise-addr <IP_NETWORK_INTERFACE>
```

Ou récupérer le token pour les machines workers
```
$ docker swarm join-token worker
```

Si les machines sont déjà créées:
```
$ docker-machine start node1
$ docker-machine start node2
$ docker-machine start node3
```

Si non, créer 3 hôtes nommés node1, node2, node3
```
$ docker-machine create --driver virtualbox node1
$ docker-machine create --driver virtualbox node2
$ docker-machine create --driver virtualbox node3
```

Utilisez SSH pour vous connecter à vos machines
```
$ docker-machine ssh node1
$ docker-machine ssh node2
$ docker-machine ssh node3
```

Installer nano dans Boot2Docker
```
$ tce-load -wi nano
```

Autoriser d'autres machines à se joindre au Swarm
```
node1@:$ docker swarm join --token <TOKEN_ID>
node2@:$ docker swarm join --token <TOKEN_ID>
node3@:$ docker swarm join --token <TOKEN_ID>
```

```
$ docker stack deploy -c docker-stack.yml voting-app
$ docker stack ls
$ docker stack ps voting-app
$ docker service ls
```