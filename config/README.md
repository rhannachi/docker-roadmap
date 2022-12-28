## Config (Donnée non sensible)

Mise en place d'une application reverse-proxy client/serveur

l'ensemble de fichier nécessaire pour sécuriser la communication entre un client et notre application:
- server-key.pem
- server-cert.pem

Modifier votre fichier /etc/hosts de façon à ce que le domaine "my-web-site.com" soit résolu avec l'adresse 127.0.0.1.

```
nano /etc/hosts
=>
127.0.0.1       my-web-site.com
```

Lancer un swarm
```
$ docker swarm init  --advertise-addr <IP_NETWORK_INTERFACE>
```

lancer l'application:
```
$ docker stack deploy -c docker-stack.yml app
```

url: https://my-web-site.com

Arrêter les services en cours d'exécution
```
docker service rm $(docker service ls -q)
```