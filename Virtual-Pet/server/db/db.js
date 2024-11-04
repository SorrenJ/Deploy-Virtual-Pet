const { Pool } = require('pg');
require('dotenv').config(); // Load environment variables from .env file

let pool;

if (process.env.DATABASE_URL) {
  // Use DATABASE_URL directly for production/deployment
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false } // Enable SSL for production databases like AWS RDS
  });
} else {
  // Use individual environment variables for local development
  pool = new Pool({
    user: process.env.DB_USER || 'labber',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'beastly_bonds_development',
    password: process.env.DB_PASS || 'labber',
    port: process.env.DB_PORT || 5432,
  });
}

module.exports = pool;
