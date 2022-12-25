### Docker Machine
Il faudra installer docker-machine, les instructions sont détaillées à l'adresse https://docs.docker.com/machine/install-machine/

installer virtualbox
```
$ sudo apt update && apt upgrade && apt install virtualbox
```

créer 3 hôtes nommés node1, node2, node3
```
$ docker-machine create --driver virtualbox node1
$ docker-machine create --driver virtualbox node2
$ docker-machine create --driver virtualbox node3
```

```
$ docker-machine ls
NAME    ACTIVE   DRIVER       STATE     URL                         SWARM   DOCKER      ERRORS
node1   -        virtualbox   Running   tcp://192.168.99.100:2376           v19.03.12   
node2   -        virtualbox   Running   tcp://192.168.99.101:2376           v19.03.12   
node3   -        virtualbox   Running   tcp://192.168.99.102:2376           v19.03.12   
```

### Création du swarm

Connecter en ssh sur node1
```
$ docker-machine ssh node1
```

Nous pouvons ensuite initialiser le swarm
```
node1@:$ docker swarm init --advertise-addr <IP_NETWORK_INTERFACE>
=>
Swarm initialized: current node (5nss4dyj77x2wjwdbc2gsiet1) is now a manager.
To add a worker to this swarm, run the following command:

    docker swarm join --token SWMTKN-1-1272f6pr1yzpnl9u5xbv0pp8afk5w3b4io37sdy96bu18emoen-6kak95x0gwu4j7v63eopc0do9 192.168.99.100:2377

To add a manager to this swarm, run 'docker swarm join-token manager' and follow the instructions.
```
Le daemon Docker du node1 est maintenant en Swarm mode.

Lister les nodes de notre cluster
```
node1@:$ docker node ls
=>
ID                            HOSTNAME            STATUS              AVAILABILITY        MANAGER STATUS      ENGINE VERSION
5nss4dyj77x2wjwdbc2gsiet1 *   node1               Ready               Active              Leader              19.03.12
```

### Ajouter des workers
Depuis les 2 autres terminaux (node2, node3) , nous lançons la commande docker swarm join... obtenue lors de l’initialisation du Swarm.

```
$ docker-machine ssh node2
node2@:$ docker swarm join --token SWMTKN-1-1272f6pr1yzpnl9u5xbv0pp8afk5w3b4io37sdy96bu18emoen-6kak95x0gwu4j7v63eopc0do9 192.168.99.100:2377
=> This node joined a swarm as a worker.
```

```
$ docker-machine ssh node3
node3@:$ docker swarm join --token SWMTKN-1-1272f6pr1yzpnl9u5xbv0pp8afk5w3b4io37sdy96bu18emoen-6kak95x0gwu4j7v63eopc0do9 192.168.99.100:2377
=> This node joined a swarm as a worker.
```

Depuis le node1, nous pouvons alors lister les nodes présents dans notre cluster:
```
node1@:$ docker node ls
=>                                                                                                                                                         
ID                            HOSTNAME            STATUS              AVAILABILITY        MANAGER STATUS      ENGINE VERSION
5nss4dyj77x2wjwdbc2gsiet1 *   node1               Ready               Active              Leader              19.03.12
ihslg48h3zdeh5bzrl3m0nhz0     node2               Ready               Active                                  19.03.12
kn6oxtw6sup3jjq345b4dtg05     node3               Ready               Active                                  19.03.12
```