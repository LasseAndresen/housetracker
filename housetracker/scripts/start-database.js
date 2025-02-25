const { execSync } = require('child_process');
require('dotenv').config(); // Make sure to install dotenv: npm install dotenv

const command = `docker run -d \
  --name ${process.env.DB_NAME} \
  -p ${process.env.DB_PORT}:5432 \
  -e POSTGRES_PASSWORD=${process.env.DB_PASS} \
  -e POSTGRES_USER=${process.env.DB_USER} \
  -e POSTGRES_DB=${process.env.DB_NAME} \
  -v timescale_data:/var/lib/postgresql/data \
  timescale/timescaledb:latest-pg15`;

  console.log('Starting TimescaleDB container...');
  try {
    const output = execSync(command, { encoding: 'utf8' });
    console.log('TimescaleDB container started successfully!');
    console.log('Container ID:', output.trim());
  } catch (error) {
    console.error('Failed to start TimescaleDB container:', error.message);
    process.exit(1);
  }
