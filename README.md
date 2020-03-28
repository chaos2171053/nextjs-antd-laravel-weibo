# laravel-template-docker


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
docker-compose run --rm npm install
docker-compose run --rm composer update
docker-compose run --rm npm run dev
docker-compose run --rm artisan migrate
`


### Reference 

1. [Create a local Laravel dev environment with Docker](https://www.youtube.com/watch?v=5N6gTVCG_rw&t=654s)
2. [The beauty of Docker for local Laravel development](https://dev.to/aschmelyun/the-beauty-of-docker-for-local-laravel-development-13c0)