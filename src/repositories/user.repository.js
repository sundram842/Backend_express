const { pool } = require("../database/pool");

// Find a user by email
const findByEmail = async (email) => {
  const result = await pool.query(
    "SELECT id FROM users WHERE email = $1",
    [email]
  );

  return result.rows[0] ?? null;
};

// Create a new user
const createUser = async ({ email, passwordHash }) => {
  const result = await pool.query(
    `INSERT INTO users (email, password_hash)
     VALUES ($1, $2)
     RETURNING id, email, created_at, updated_at`,
    [email, passwordHash]
  );

  return result.rows[0];
};

const getUser = async (limit,normalizeEmail)=>{
    const result = await pool.query(
        'SELECT * FROM USERS WHERE email like $1 limit $2',
        [`%${normalizeEmail}%`,limit]
        
    )

    return result.rows;
}

const getUserDetail = async (uuid) => {
    const result = await pool.query(
        'SELECT * FROM users WHERE id = $1',
        [uuid]
    );

    return result.rows[0];
};

module.exports = { findByEmail, createUser, getUser, getUserDetail };
