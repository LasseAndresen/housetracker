const { execSync } = require('child_process');
require('dotenv').config(); // Make sure to install dotenv: npm install dotenv

console.log('DB_USER:', process.env.DB_USER); // Debugging line (remove later)
const command = `typeorm-model-generator \
  --engine postgres \
  --host ${process.env.DB_HOST} \
  --port ${process.env.DB_PORT} \
  --database ${process.env.DB_NAME} \
  --user ${process.env.DB_USER} \
  --pass ${process.env.DB_PASS} \
  --skip-tables flyway_schema_history \
  --schema public \
  --output ./src/entity \
  --no-namespaces \
  --case-entities camel \
  --case-properties camel`;

console.log('Generating entities...');
execSync(command, { stdio: 'inherit' });
console.log('Entity generation complete!');
