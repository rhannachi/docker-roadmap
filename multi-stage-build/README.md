
création de l'image avec le nom front et le tag 1.0
```
$ docker image build -t front:1.0 .
```
création d'un container à partir de l'image front:1.0
```
$ docker run -p 9000:80 front:1.0
```

visite: http://localhost:9000
