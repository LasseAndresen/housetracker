### Running the database
npm run start-db
npm run migrate-db OR act -j migrate-db-prod --secret-file .secrets (last one simulates the github workflow migration)
npm run

#### Useful commands
npm run reset-db (if not the first time)

docker stop housetracker

docker rm housetracker (stops container if running)

