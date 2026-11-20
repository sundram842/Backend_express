const { checkConnection } = require('../database/pool');

const getHealth = async (req, res) => {
  try {
    const info = await checkConnection();
    res.json({
      status: 'ok',
      uptime: process.uptime(),
      database: { status: 'connected', name: info.database, user: info.user, serverTime: info.now },
    });
  } catch (err) {
    res.status(503).json({
      status: 'error',
      uptime: process.uptime(),
      database: { status: 'disconnected', error: err.message },
    });
  }
};

module.exports = { getHealth };
