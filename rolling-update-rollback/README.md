
## Création d'un Swarm

créer 2 hôtes nommés node1, node2
```
$ docker-machine create --driver virtualbox node1
$ docker-machine create --driver virtualbox node2
```

```
$ docker-machine ls
=>
NAME    ACTIVE   DRIVER       STATE     URL                         SWARM   DOCKER      ERRORS
node1   -        virtualbox   Running   tcp://192.168.99.107:2376           v19.03.12   
node2   -        virtualbox   Running   tcp://192.168.99.108:2376           v19.03.12   
```

Connecter en ssh sur node1
```
$ docker-machine ssh node1
```

Nous pouvons initialiser le swarm sur le node1
```
node1@:$ docker swarm init --advertise-addr <IP_NETWORK_INTERFACE_NODE_1>
```

Connecter en ssh sur node2
```
$ docker-machine ssh node2
```

Nous pouvons join le node2 sur le swarm
```
node2@:$ docker swarm join --token ....
```

Lister les nodes de notre cluster
```
node1@:$ docker node ls   
=>                                                                                                                                                        
ID                            HOSTNAME            STATUS              AVAILABILITY        MANAGER STATUS      ENGINE VERSION
lgjr2255qbpt2hpr6u5msspfq *   node1               Ready               Active              Leader              19.03.12
n6vsgi4van250h8nhk6gnp619     node2               Ready               Active                                  19.03.12

```

Déploiement d'un service
```
@node1:$ docker service create --name www --replicas 4 --publish 8080:80 nginx:1.14.0-alpine
```
4 replicas sont définis pour ce service, cela signifie que 4 containers tournent maintenant sur le Swarm.\
Si une requête arrive sur le port 8080 du node1 ou node2 du Swarm, elle sera load balancé sur l'une de ces 4 containers.

http://192.168.99.107:8080\
http://192.168.99.108:8080

```
@node1:$ docker service ps www
=>                                                                                                                                                
ID                  NAME                IMAGE                 NODE                DESIRED STATE       CURRENT STATE            ERROR               PORTS
xy657ffwwbka        www.1               nginx:1.14.0-alpine   node1               Running             Running 29 seconds ago                       
nc344iwtkho2        www.2               nginx:1.14.0-alpine   node2               Running             Running 27 seconds ago                       
la8syg2k7l8e        www.3               nginx:1.14.0-alpine   node1               Running             Running 29 seconds ago                       
6hdfht0pwodw        www.4               nginx:1.14.0-alpine   node2               Running             Running 27 seconds ago                       
```

### Rolling update (Mise à jour du service)

- --image: nouvelle image pour notre service
- --update-parallelism: définit le nombre de tâches à mettre à jour en même temps.
- --update-delay temps: d'attente entre la mise à jour de 2 groupes de tâches.
```
@node1:$ docker service update --update-parallelism 2 --update-delay 10s  --image httpd:2.4-alpine www
=>
www
overall progress: 4 out of 4 tasks 
1/4: running   [==================================================>] 
2/4: running   [==================================================>] 
3/4: running   [==================================================>] 
4/4: running   [==================================================>] 
verify: Service converged 
```

Détaille le service www au niveau de son implementation
```
@node1:$ docker service ps www
=>                                                                                                                                                
ID                  NAME                IMAGE                 NODE                DESIRED STATE       CURRENT STATE            ERROR               PORTS
qwyfelwhitk4        www.1               httpd:2.4-alpine      node1               Running             Running 2 minutes ago                        
xy657ffwwbka         \_ www.1           nginx:1.14.0-alpine   node1               Shutdown            Shutdown 2 minutes ago                       
qcvzz0rd0lp3        www.2               httpd:2.4-alpine      node2               Running             Running 2 minutes ago                        
nc344iwtkho2         \_ www.2           nginx:1.14.0-alpine   node2               Shutdown            Shutdown 2 minutes ago                       
wrfsphx3swyh        www.3               httpd:2.4-alpine      node1               Running             Running 2 minutes ago                        
la8syg2k7l8e         \_ www.3           nginx:1.14.0-alpine   node1               Shutdown            Shutdown 2 minutes ago                       
xjonjy509nkh        www.4               httpd:2.4-alpine      node2               Running             Running 2 minutes ago                        
6hdfht0pwodw         \_ www.4           nginx:1.14.0-alpine   node2               Shutdown            Shutdown 2 minutes ago                       
```

```
@node1:$ docker service inspect www
=>
[
    {
        ...
        "Spec": {
            "Name": "www",
            "Labels": {},
            "TaskTemplate": {
                "ContainerSpec": {
==================> "Image": "httpd:2.4-alpine@sha256:86ed18b4670b3be349e62f05c34bf0c28f3e0a73732969c417fd53e04af807f4",
                    "Init": false,
                    "StopGracePeriod": 10000000000,
                    "DNSConfig": {},
                    "Isolation": "default"
                },
        ...
        "PreviousSpec": {
            "Name": "www",
            "Labels": {},
            "TaskTemplate": {
                "ContainerSpec": {
==================> "Image": "nginx:1.14.0-alpine@sha256:8976218be775f4244df2a60a169d44606b6978bac4375192074cefc0c7824ddf",
                    "Init": false,
                    "DNSConfig": {},
                    "Isolation": "default"
                },
        ....
]

```

### Rollback

Revenir à la version du service www ayant l'image nginx:1.14.0-alpine
```
@node1:$ docker service rollback www
=>
www
rollback: manually requested rollback 
overall progress: rolling back update: 4 out of 4 tasks 
1/4: running   [>                                                  ] 
2/4: running   [>                                                  ] 
3/4: running   [>                                                  ] 
4/4: running   [>                                                  ] 
verify: Service converged 
```

```
@node1:$ docker service ps www
=>                                                                                                                                               
ID                  NAME                IMAGE                 NODE                DESIRED STATE       CURRENT STATE             ERROR               PORTS
az1d40j8qz2d        www.1               nginx:1.14.0-alpine   node1               Running             Running 37 seconds ago                        
qwyfelwhitk4         \_ www.1           httpd:2.4-alpine      node1               Shutdown            Shutdown 37 seconds ago                       
xy657ffwwbka         \_ www.1           nginx:1.14.0-alpine   node1               Shutdown            Shutdown 16 minutes ago                       
r0iuhfug6t70        www.2               nginx:1.14.0-alpine   node2               Running             Running 42 seconds ago                        
qcvzz0rd0lp3         \_ www.2           httpd:2.4-alpine      node2               Shutdown            Shutdown 42 seconds ago                       
nc344iwtkho2         \_ www.2           nginx:1.14.0-alpine   node2               Shutdown            Shutdown 16 minutes ago                       
gdcb9piipqhl        www.3               nginx:1.14.0-alpine   node1               Running             Running 47 seconds ago                        
wrfsphx3swyh         \_ www.3           httpd:2.4-alpine      node1               Shutdown            Shutdown 47 seconds ago                       
la8syg2k7l8e         \_ www.3           nginx:1.14.0-alpine   node1               Shutdown            Shutdown 16 minutes ago                       
q94s2yica0dl        www.4               nginx:1.14.0-alpine   node2               Running             Running 51 seconds ago                        
xjonjy509nkh         \_ www.4           httpd:2.4-alpine      node2               Shutdown            Shutdown 52 seconds ago                       
6hdfht0pwodw         \_ www.4           nginx:1.14.0-alpine   node2               Shutdown            Shutdown 16 minutes ago                       
```
