### Deploying the docker image
docker run -d --name timescaledb -p 5432:5432 -e POSTGRES_USER=waluda -e POSTGRES_PASSWORD=<INSERT_PASSWORD> -e POSTGRES_DB=housetracker -v timescale_data:/var/lib/postgresql/data timescale/timescaledb:latest-pg15

### Test running github action
act -j migrate-db-prod --secret-file .secrets