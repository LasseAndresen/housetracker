const { execSync } = require('child_process');
require('dotenv').config();

const containerName = process.env.DB_NAME;

function containerExists(name) {
  try {
    const result = execSync(`docker ps -a --filter "name=^/${name}$" --format "{{.Names}}"`, { encoding: 'utf8' });
    return result.trim() === name;
  } catch {
    return false;
  }
}

try {
  if (containerExists(containerName)) {
    console.log(`Container "${containerName}" exists. Attempting to start...`);
    const startOutput = execSync(`docker start ${containerName}`, { encoding: 'utf8' });
    console.log(`Container started: ${startOutput.trim()}`);
  } else {
    const runCommand = `docker run -d `
        + `--name ${containerName} `
        + `-p ${process.env.DB_PORT}:5432 `
        + `-e POSTGRES_PASSWORD=${process.env.DB_PASSWORD} `
        + `-e POSTGRES_USER=${process.env.DB_USER} `
        + `-e POSTGRES_DB=${containerName} `
        + `-v timescale_data:/var/lib/postgresql/data `
        + `timescale/timescaledb:latest-pg15`;

    console.log('Starting TimescaleDB container...');
    const output = execSync(runCommand, { encoding: 'utf8' });
    console.log('TimescaleDB container started successfully!');
    console.log('Container ID:', output.trim());
  }
} catch (error) {
  console.error('Error occurred:', error.message);
  process.exit(1);
}
