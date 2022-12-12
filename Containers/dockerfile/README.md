On utilise la commande image build pour construire notre image et on lui donne un tag avec -t.
```
$ docker image build -t app:1.0 .
```
Création d'un container à partir de l'image app:1.0
```
$ docker container run -p 8080:80 app:1.0
```

