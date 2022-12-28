## Docker Hub

### Push Image to Docker Hub

```
$ docker login
```
```
$ docker-compose build
```
```
$ docker image ls
=>
REPOSITORY          TAG                     IMAGE ID       CREATED         SIZE
www                 health                  4a0dc255c095   2 minutes ago   181MB
```
```
$ docker tag www:health rhannachi1991/www:health
```
```
$ docker push rhannachi1991/www:health
```