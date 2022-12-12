1 - Créez une image, nommée ping:2.0, à partir de notre Dockerfile.
```
$ docker image build -t ping:2.0 .
```
2 - par rapport à ENTRYPOINT, il faut redéfinir la commande dans sa totalité, ce qui est fait en la spécifiant à la suite du nom de l’image
```
$ docker container run ping:2.0 ping -c 3 8.8.8.8
```

