.PHONY: start stop restart shell dev prod install format

install: start
	docker-compose exec node npm install

start:
	docker-compose up -d node

stop:
	docker-compose down

restart: stop start

shell: start
	docker-compose exec node bash

dev: start
	docker-compose exec node npm run dev

prod: start
	docker-compose exec node npm run prod

format: start
	docker-compose exec node npm run format