1 - Créez une image, nommée ping:1.0 à partir de notre Dockerfile.
```
$ docker image build -t ping:1.0 .
```
2 - Lancez maintenant un container basé sur l’image ping:1.0 (avec les arguments nécessaire pour faire fonctionner notre ping )
```
$ docker container run ping:1.0 -c 3 8.8.8.8
```
