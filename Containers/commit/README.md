1 - Lancez une container basé sur une image alpine:3.8, en mode interactif, et en lui donnant le nom c1
```
$ docker container run -ti --name c1 alpine:3.8
```
2 - dans le container lancez la commande curl google.com
```
/ # curl google.com
/bin/sh: curl: not found

=> curl n'est pas disponible dans une image alpine, il faut l'installer.
```
3 - dans le container installez curl à l’aide du gestionnaire de package apk
```
# apk update && apk add curl
```
4 - Quittez le container avec CTRL-P CTRL-Q (pour ne pas killer le processus de PID 1)\
5 - Créez une image, nommée curly, à partir du container c1
```
$ docker container commit c1 curly
```
6 - Lancez un shell dans un container basée sur l’image curly et vérifiez que curl est présent
```
$ docker container run -ti curly
# curl google.com
```

