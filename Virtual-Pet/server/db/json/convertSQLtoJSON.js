const fs = require('fs');

// Function to verify file paths
function verifyFilePath(filePath) {
    if (!fs.existsSync(filePath)) {
        console.error(`Error: File not found at path: ${filePath}`);
        process.exit(1);
    } else {
        console.log(`File found: ${filePath}`);
    }
}


// Function to parse SQL seeds and generate a relationship-friendly JSON
function generateRelationshipFriendlyJSON(schemaFileContent, seedsFileContent) {
    const data = {
        moods: [],
        colors: [],
        species: [],
        sprites: [],
        users: [],
        personalities: [],
        pets: [],
        shop: [],
        toys: [],
        toiletries: [],
        foods: [],
        inventory: [],
        user_toys: [],
        user_toiletries: [],
        user_foods: []
    };

    // Match all INSERT statements
    const insertStatements = seedsFileContent.match(/INSERT INTO (\w+)\s+\((.*?)\)\s+VALUES\s+(.*?);/gs);

    if (insertStatements) {
        insertStatements.forEach(statement => {
            const match = statement.match(/INSERT INTO (\w+)\s+\((.*?)\)\s+VALUES\s+(.*?);/s);
            if (!match) return;

            const [_, table, columns, values] = match;
            const columnList = columns.split(',').map(col => col.trim());

            const valueSets = values.match(/\((.*?)\)/gs);
            if (valueSets) {
                valueSets.forEach(valueSet => {
                    const valuesArray = valueSet
                        .replace(/^\(/, '')
                        .replace(/\)$/, '')
                        .split(/,\s*(?![^()]*\))/)
                        .map(val => val.trim().replace(/^'|'$/g, ''));

                    const entry = {};
                    columnList.forEach((col, index) => {
                        entry[col] = valuesArray[index];
                    });

                    if (data[table]) {
                        data[table].push(entry);
                    } else {
                        console.warn(`Warning: Table "${table}" not found in the schema structure.`);
                    }
                });
            }
        });
    } else {
        console.warn('No INSERT statements found in the seeds file.');
    }

    return data;
}
// Example file paths
const schemaFilePath = '../schema/complete_schema.sql';
const seedsFilePath = '../seeds/complete_seed.sql';
const outputFilePath = './beastly_bonds.development.json';


// Verify file paths
verifyFilePath(schemaFilePath);
verifyFilePath(seedsFilePath);

// Read the schema and seeds files
const schemaContent = fs.readFileSync(schemaFilePath, 'utf-8');
const seedsContent = fs.readFileSync(seedsFilePath, 'utf-8');

// Generate the relationship-friendly JSON
const relationshipFriendlyData = generateRelationshipFriendlyJSON(schemaContent, seedsContent);

// Save the JSON to a file
fs.writeFileSync(outputFilePath, JSON.stringify(relationshipFriendlyData, null, 4));

console.log(`Relationship-friendly JSON file saved at: ${outputFilePath}`);
