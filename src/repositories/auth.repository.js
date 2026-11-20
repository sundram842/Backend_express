const {pool} = require("../database/pool");

// Find email

const findEmail = async (email,password)=>{
    const result = await pool.query(
        "SELECT ID, password_hash, email FROM USERS WHERE email = $1",
        [email]
    )
    if(result?.rows[0]?.password_hash === password){
        return result?.rows[0];
    }
}

const setRefreshToken = async (user_id, token_hash) => {
    await pool.query(
        `INSERT INTO refresh_token (user_id, token_hash, expires_at)
         VALUES ($1, $2, NOW() + INTERVAL '15 days')`,
        [user_id, token_hash]
    );
};

const getRefreshToken = async (token_hash) => {
    const result = await pool.query(
        `SELECT * FROM refresh_token WHERE token_hash = $1`,
        [token_hash]
    );

    return result.rows[0];
};

const logout = async(token)=>{
    const result = await pool.query(
        `update refresh_token set revoked_at = NOW() where token_hash = $1 and revoked_at is null RETURNING id`,
        [token]
    )

    return result.rowCount > 0;
}


module.exports = {findEmail,setRefreshToken,getRefreshToken,logout};

