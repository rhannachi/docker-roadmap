
## Les volums permettent de découpler les données du cycle de vie d'un conteneur.

### Exemple 1

Supprimer tous les volumes sur la machine hote
```
$ docker volume prune
```

Lancer le container mongo-alpine
```
$ docker container run -d mvertes/alpine-mongo
=> <ID_CONTAINER>
```

Afficher la liste des volumes
```
$ docker volume ls
=>
DRIVER    VOLUME NAME
local     <ID_VOLUME>
```
Sur la machine hôte, lorsque j'ai lancé le container de mongo, j'ai 1 volume qui a été créé.
ce volume est un folder surl la machine hôte.

Si je regarde ce qu'il y a à l'intérieur de ce dossier.
```
$ docker inspect <ID_VOLUME> 
=>
[
    {
        "CreatedAt": "2022-12-15T11:55:44+01:00",
        "Driver": "local",
        "Labels": null,
        "Mountpoint": "/var/lib/docker/volumes/dccf2f59ba221128436e2a86f9136a61d7dd42a48d29ffe1a414981d58876e84/_data",
        "Name": "dccf2f59ba221128436e2a86f9136a61d7dd42a48d29ffe1a414981d58876e84",
        "Options": null,
        "Scope": "local"
    }
]

```

### Exemple 2

Créer un volume qu'on appelle data
```
$ docker volume create data
```
Lancer un container, on va lui donner un nom et on va le baser sur mongo:4.0.
On lui donne le nom du volume data et faire en sorte que les volumes sont montés dans /data/db du container.
```
$ docker container run -d --name mongo -v data:/data/db mongo:4.0
```

Si on inspecte le volume déjà créé
```
$ docker volume inspect data
=>
[
    {
        "CreatedAt": "2022-12-15T12:21:07+01:00",
        "Driver": "local",
        "Labels": null,
        "Mountpoint": "/var/lib/docker/volumes/data/_data",
        "Name": "data",
        "Options": null,
        "Scope": "local"
    }
]

```