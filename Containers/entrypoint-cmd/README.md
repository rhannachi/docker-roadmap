Dans le Dockerfile nous définissons ENTRYPOINT et CMD, la commande lancée dans un container sera la concaténation de ces 2 instructions: ping -c3 localhost.
```
$ docker image build -t ping:3.0 .
$ docker container run ping:3.0
```

Nous pouvons écraser la commande par défaut(le CMD) et spécifier une autre adresse IP 8.8.8.8
```
$ docker container run ping:3.0 8.8.8.8
```
