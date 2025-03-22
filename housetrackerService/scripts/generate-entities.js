const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

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

// Post-processing step to add BaseEntity extension
const entityDir = './src/entity/entities';
console.log('Adding BaseEntity extension to all entity files...');

fs.readdirSync(entityDir).forEach(file => {
  if (file.endsWith('.ts')) {
    const filePath = path.join(entityDir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Add BaseEntity import if it's not already there
    if (!content.includes('BaseEntity')) {
      // Find the import section
      const importMatch = content.match(/import {([^}]+)} from "typeorm"/);
      if (importMatch) {
        const newImport = `import {${importMatch[1]}, BaseEntity} from "typeorm"`;
        content = content.replace(/import {([^}]+)} from "typeorm"/, newImport);
      } else {
        // If no typeorm import found, add it at the top
        content = `import { BaseEntity } from "typeorm";\n${content}`;
      }
    }

    // Update the class definition to extend BaseEntity
    content = content.replace(
      /export class (\w+)/g,
      'export class $1 extends BaseEntity'
    );

    // Write the updated content back to the file
    fs.writeFileSync(filePath, content);
    console.log(`Updated ${file}`);
  }
});

console.log('All entity files have been updated to extend BaseEntity!');
