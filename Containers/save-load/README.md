On commence par sauvegarder une image alpine dans le fichier alpine.tar
```
$ docker save -o alpine.tar alpine
```

On utilise la commande load pour créer l'image alpine à partir du fichier alpine.tar
```
$ docker load < alpine.tar
```
