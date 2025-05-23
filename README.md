# House tracker
Enables tracking of real estate listings or filters by scraping URL's on a continuous basis.

## Tech Stack
- /**webFrontend:** Angular SSR Front End
- /**webService:** NestJS Primary Back End
- /**scraper:** Node.js w. Express Microservice that scrapes websites
- /**timescaleDB:** Timescale DB (PostgreSQL based timeseries database) for storing relational and timeseries data
  - FlyWay is used in a separate migration step for schema and data migration.

Every entry in the stack is dockerized with hot-reloading enabled.

## Running the whole stack
- **Dev mode:** docker compose watch 
- **Without watch:** docker compose up --build
- **Reset containers including volumes:** docker compose down -v

The project will be accessible on localhost:4200
