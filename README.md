# Local development

Run `make help` to see all the available actions but to set the environment up and running for the first time run `make init`.

In subsequent occasions run `make up` to spin up the containers and `make bash` to run a bash command inside the main container.

Add to your `/etc/hosts`:

```
127.0.0.1       app.local
127.0.0.1       api.app.local
```

From your local environment you could go to:

 * [http://app.local/](http://app.local/) to access the React application
 * [http://api.app.local/docs](http://api.app.local/docs) to access the API documentation

# Deployment

## Frontend

A script ready for AWS Amplify can be found in `amplify.yml`, it's configured to run the JS tests and build the React application.

These environment variables need to be set in order to configure the reporting frontend
 
```dotenv
REACT_APP_API_URL: <backend_api_url>
```

## Backend

These environment variables need to be set in order to configure the reporting API.

```dotenv
APP_ENV=prod
APP_SECRET=<random_string_for_csrf>
CORS_ALLOW_ORIGIN=<frontend_app_url> # eg: ^https?://(localhost|127\.0\.0\.1)(:[0-9]+)?$
DATABASE_URL=<database_url> # eg: postgresql://<user>:<password>@<server>:5432/<db>?serverVersion=9.6&charset=utf8
```

## Executing tests
In order to execute all the test just run `make test`  
It will execute:
 - psalm (code checks)
 - phpspec (Backend unit tests)
 - jest (Frontend unit tests)
 - behat (API tests)
 - cypress (Integration tests)

If you want to run cypress with an interactive UI run `make cypress`

# Accessing localhost with ngrok

In case you want to access your local environment from a remote machine, you can set up a [ngrok](https://ngrok.com/) connection.

1. As you will need two simultaneous connections, first temporarily remove or rename `/home/[USER_NAME]/.ngrok2/ngrok.yml` file. Or you can just do `./ngrok start --all` **after** running the tunnels.
2. Start sharing the backend environment through 80 port: go to **ngrok** folder and do `./ngrok http 80`. You can explicity set the `host-header` with `./ngrok http 80 -host-header=api.[HOST_NAME_OF_THE_APP].local`.
3. Copy the "Forwarding" path, and paste it to `REACT_APP_API_URL` variable in `[PROJECT_NAME]/apps/frontend/.env.local` file. For example, `REACT_APP_API_URL=https://[ID].ngrok.io`.
4. If necessary, change `CORS_ALLOW_ORIGIN` variable to `^https?://(localhost|127\.0\.0\.1|[APP].local|[^\.]+\.ngrok.io)(:[0-9]+)?$` or `*` in `[PROJECT_NAME]/apps/api/.env.local` file.
5. Do `make frontend`.
6. Open a new terminal for **ngrok** and do `./ngrok http 8000`. Again, you can explicity set the `host-header` with `./ngrok http 8000 -host-header=[HOST_NAME_OF_THE_APP].local`.
7. Go to the new "Forwarding" path.
