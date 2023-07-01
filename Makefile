s=app
u=www-data

.PHONY: init
init: rm up copy-env install db ## Recreate Containers and Install Dependencies
.PHONY: copy-env
copy-env: ## Copy .env to .env.local
	cp --no-clobber apps/frontend/.env.dist apps/frontend/.env.local
	cp --no-clobber apps/api/.env apps/api/.env.local
.PHONY: build
build: ## Build Docker Image Ignoring the Cache
	docker-compose build --no-cache
.PHONY: rm
rm: ## Stop and Delete Containers, Clean Volumes.
	docker-compose stop
	docker-compose rm -v -f
	docker-compose build
.PHONY: stop
stop: ## Stop Environment
	docker-compose stop
.PHONY: up
up: ## Spin Up Environment
	docker-compose up -d
.PHONY: bash
bash: ## Connect to the Development Container
	docker-compose exec --user=${u} ${s} /bin/bash
.PHONY: install
install: ## Install Project Dependencies
	docker-compose run --user=${u} --rm ${s} sh -lc 'composer install'
	docker-compose run --user=${u} --rm ${s} sh -lc 'cd core && composer install'
	docker-compose run --user=${u} --rm ${s} sh -lc 'cd apps/api && composer install'
	docker-compose run --user=${u} --rm ${s} sh -lc 'cd apps/frontend && yarn install'
	docker-compose run --user=${u} --rm ${s} sh -lc 'cd asset && yarn install'
	docker-compose run --user=${u} --rm ${s} sh -lc 'cd component && yarn install'
	docker-compose run --user=${u} --rm ${s} sh -lc 'yarn install'
	docker-compose run --user=${u} --rm ${s} sh -lc 'yarn build:frontend'
	docker-compose run --user=node --rm --entrypoint='npm rebuild node-sass' cypress
.PHONY: db
db: ## Create Database, Migrations and Fixtures
	docker-compose run --user=${u} --rm ${s} sh -lc 'cd apps/api && chmod +x bin/console'
	docker-compose run --user=${u} --rm ${s} sh -lc 'cd apps/api && bin/console doctrine:database:create --if-not-exists'
	docker-compose run --user=${u} --rm ${s} sh -lc 'cd apps/api && bin/console doctrine:migration:migrate --no-interaction'
.PHONY: test
test: ## Run All the Tests Suites
	docker-compose run --user=${u} --rm ${s} sh -lc 'cd core/ && vendor/bin/psalm'
	docker-compose run --user=${u} --rm ${s} sh -lc 'cd core/ && vendor/bin/phpspec run'
	docker-compose run --user=${u} --rm ${s} sh -lc 'cd apps/api && vendor/bin/psalm'
	docker-compose --project-dir= run --user=${u} --rm ${s} sh -lc 'yarn eslint'
	docker-compose run --user=${u} --rm ${s} sh -lc 'yarn test'
	docker-compose run --user=${u} --rm ${s} sh -lc 'cd apps/api && bin/console doctrine:database:create  --if-not-exists --env=test'
	docker-compose run --user=${u} --rm ${s} sh -lc 'cd apps/api && bin/console doctrine:migration:migrate --no-interaction --env=test'
	docker-compose run --user=${u} --rm ${s} sh -lc 'cd apps/api && vendor/bin/behat'
	docker-compose run --user=node --rm --entrypoint='npm rebuild node-sass' cypress
	docker-compose run --user=node --rm --entrypoint='yarn run:cypress' cypress
.PHONY: cypress
cypress: ## Open Cypress
	docker-compose run --user=node --rm --entrypoint='npm rebuild node-sass' cypress
	docker-compose run --user=node --rm --entrypoint='yarn open:cypress' cypress
.PHONY: logs
logs: ## Look for 's' Service Logs, make s=php logs
	docker-compose logs -f ${s}
.PHONY: frontend
frontend: ## Spin Up Frontend in Port 8000
	docker-compose exec --user=${u} ${s} sh -lc 'yarn start:frontend'
.PHONY: help
help: ## Display this Help Message
	@cat $(MAKEFILE_LIST) | grep -e "^[a-zA-Z_\-]*: *.*## *" | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
