# Comment lancer les containers de dev et de prod

## Dev

Un compose spécial dev a été mis en place afin de supporter les hot reload de angular.

Pour le lancer, il faut éxécuter les 2 commande suivantes :

```shell
$ docker compose -f compose-dev.yml build
$ docker compose -f compose-dev.yml up
```

Le front sera alors accessible à l'adresse `localhost:4200` et l'api à l'adresse `localhost:4200/api`.

En particulier, les liens api doivent tous être préfixés de `/api/`. Par exemple, pour accéder à la route `/test`, l'adresse de la requête doit être `/api/test`.

## Prod

Afin de lancer le container de prod, il faut au préalable construire l'image.

Pour construite l'image, il suffit d'exécuter la commande :

```shell
$ docker compose build
```

Nous pourrons ensuite lancer l'image avec la commande suivante :

```shell
$ docker compose up
```

Il est à noter que si un seul build est nécessaire, alors seul la commande `up` est nécessaire: cette commande buildera les images et lancera les conteneurs.

Le front sera alors accessible à l'adresse `localhost:8000` et l'api à l'adresse `localhost:8000/api`.

Les règles concernant les routes API sont les mêmes que pour la prod: cela permet d'avoir strictement les mêmes routes en prod et en dev, et on aime ça car ça enlève un peu de complexité.