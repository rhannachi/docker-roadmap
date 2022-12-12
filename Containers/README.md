### Création d'un container basé sur l'image ubuntu
- -t: alloue un pseudo TTY
- -i: STDIN ouvert
```
$ docker container run -it ubuntu bash
```

- -d: lancer en background
```
$ docker container run -d ubuntu
```

### Publication d'un port
le port 80 de l'instance Nginx tournant dans le container est publié surl le port 8080 de l'hôte
```
$ docker container run -d -p 8080:80 nginx
$ docker container ls
```

### Bint-mount 
Montage du code applicatif depuis la machine locale
```
$ docker container run -v $PWD/www:/usr/share/nginx/html -d -p 80:80 nginx
```
Prise en compte des changements
```
$ docker container run --mount type=bind,src=$PWD/www,dst=/usr/share/nginx/html -d -p 80:80 nginx
```

### Portainer
Gérer des environnements de conteneurs.
```
$ docker container run -d -p 9000:9000 -v /var/run/docker.sock:/var/run/docker.sock portainer/portainer
```

### Limitation des ressources
Utilisation des 4 cores
```
$ docker run -it --rm progrium/stress --cpu 4
=> 100% du CPU
```
Utilisation de 2 cores
```
$ docker run --cpus 2 -it --rm progrium/stress --cpu 4
=> 50% du CPU
```

Limitation de la RAM 32 MO
```
$ docker container run --memory 32m estesp/hogit
```

### name
Spécification du nom pour un container
```
$ docker container run -d --name debug alpine
```

### ls (container)

Liste des continers actifs
```
$ docker container ls
```
Liste des containers actifs et stoppés
```
$ docker container ls -a
```
Liste des identifiants des containers actifs et stoppés
```
$ docker container ls -a -q
```

### inspect
```
$ docker container inspect <ID_CONTAINER>
```

### logs
```
$ docker container run -d --name ping ubuntu ping 8.8.8.8
$ docker container logs -f ping
```

### stop

```
$ docker container stop <ID_CONTAINER>
```
Générer une liste de tous les containers en cours d'exécution et les arrêtez
```
$ docker container stop $(docker container ls -q)
```

### rm (container)

Supprimer un container
```
$ docker container rm <ID_CONTAINER>
```

Supprimer tous les containers arrêtés
```
$ docker container rm -f $(docker container ls -aq)
```

### rm (image)
```
$ docker image rm ubuntu
$ docker image rm $(docker image ls -q)
```

### prune
Nettoyer les images non-utilisées et gagner des gigas
```
$ docker image prune
```
Une autre commande est également disponible pour nettoyer encore plus de choses 
```
$ docker system prune
```