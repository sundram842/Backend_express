// Standalone connection test: npm run db:check
const config = require('../config');
const { pool, checkConnection } = require('./pool');

const run = async () => {
  console.log(`Connecting to ${config.db.host}:${config.db.port}/${config.db.database} as ${config.db.user}...`);
  try {
    const info = await checkConnection();
    console.log('Connected!');
    console.log(`  database: ${info.database}`);
    console.log(`  user:     ${info.user}`);
    console.log(`  server:   ${info.version}`);
    console.log(`  time:     ${info.now.toISOString()}`);
    process.exitCode = 0;
  } catch (err) {
    console.error(`Connection failed: ${err.message}`);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
};

run();
