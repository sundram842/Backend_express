const app = require('./app');
const config = require('./config');
const { checkConnection } = require('./database/pool');

const start = async () => {
  try {
    const info = await checkConnection();
    console.log(`PostgreSQL connected: database "${info.database}" as "${info.user}" on ${config.db.host}:${config.db.port}`);
  } catch (err) {
    // Keep the server up so /api/health can report the problem
    console.error(`PostgreSQL connection failed (${config.db.host}:${config.db.port}): ${err.message}`);
  }

  app.listen(config.port, () => {
    console.log(`Server running on http://localhost:${config.port}`);
  });
};

start();
