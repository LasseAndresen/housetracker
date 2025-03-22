const { execSync } = require('child_process');
require('dotenv').config(); // Make sure to install dotenv: npm install dotenv

const path = require("path");

const isRunningInAct = process.env.ACT === "true"; // `act` sets this automatically
let migrationsPath = path.resolve(__dirname, "../../timescaledb/flyway/migrations");

// Debugging 1
console.log("DirName:", __dirname);

if (isRunningInAct) {
  migrationsPath = path.resolve(__dirname, "./timescaledb/flyway/migrations");
}

// Debugging 2
console.log("Resolved Migrations Path:", migrationsPath);

const command = `docker run --rm \
            -v "${migrationsPath}:/flyway/sql" \
            flyway/flyway:10 \
            -url=jdbc:postgresql://${ process.env.DB_HOST_DOCKER }:${ process.env.DB_PORT }/${ process.env.DB_NAME } \
            -user=${ process.env.DB_USER } \
            -password=${ process.env.DB_PASSWORD } \
            migrate`;

  console.log('Starting migration of TimescaleDB...');
  try {
    const output = execSync(command, { encoding: 'utf8' });
    console.log('TimescaleDB migrated successfully!');
    console.log('Container ID:', output.trim());
  } catch (error) {
    console.error('Failed to migrate TimescaleDB:', error.message);
    process.exit(1);
  }
