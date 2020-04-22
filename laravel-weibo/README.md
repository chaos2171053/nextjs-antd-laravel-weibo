# laravel-template-docker

A tempalte of laravel by docker.


## Usage

1.

`
cd src && composer create-project laravel/laravel .
`

2.
`
cd ../ && docker-compose up -d  --build
`

3.

in `.env` file,
DB_HOST=use your local ip,no 127.0.0.1

4.
``
docker-compose run --rm artisan migrate
``
``
php artisan passport:client
``
enjoy your coding

4.
Use this project in your project by git subtree.

1）add subproject


`
git clone https://github.com/chaos2171053/laravel-template-docker.git
`


`
git subtree add --prefix=<prefix> <repository> <ref>
`

2)split the project as your subproject

`
git subtree split --prefix=<project name or file name> --branch <branch name>
`

php artisan passport:client

3) if you want to share your code to this project

`
git subtree push --prefix=<your project name> https://github.com/chaos2171053/laravel-template-docker.git master
`

## commands


`
docker-compose build && docker-compose up -d  
`

`
docker-compose exec php php /var/www/html/artisan migrate
`

`
docker-compose down
`

`
docker-compose run -rm composer require ***
`

`
docker-compose up -d  --build
`


`
docker-compose run --rm composer update
docker-compose run --rm artisan migrate
composer dump-autoload
`




## TODO

* [ ] split dirctroies into different services dictory.
* [ ] support compose bash


### Reference 

1. [Create a local Laravel dev environment with Docker](https://www.youtube.com/watch?v=5N6gTVCG_rw&t=654s)
2. [The beauty of Docker for local Laravel development](https://dev.to/aschmelyun/the-beauty-of-docker-for-local-laravel-development-13c0)