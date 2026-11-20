const { Pool } = require('pg');
const config = require('../config');

const pool = new Pool({
  ...config.db,
  connectionTimeoutMillis: 5000,
});

pool.on('error', (error) => {
  console.error('Unexpected PostgreSQL pool error:', error);
});

// Runs a trivial query to confirm the database is reachable
const checkConnection = async () => {
  const { rows } = await pool.query(
    'SELECT current_database() AS database, current_user AS user, version() AS version, NOW() AS now'
  );
  return rows[0];
};

module.exports = { pool, checkConnection };
