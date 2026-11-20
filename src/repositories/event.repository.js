const {pool} = require("../database/pool");

const createEvent = async(title,description,venue,city,start_at,end_at,status,category_id) =>{
    const result = await pool.query(
        'insert into events (title,description,venue,city,start_at,end_at,status,category_id) values($1,$2,$3,$4,$5,$6,$7,$8) returning id,title,created_at ',
        [title,description,venue,city,start_at,end_at,status,category_id]
    )

    return result
}

const eventDetail = async (id) => {
    let sql = 'SELECT * FROM events';
    let values = [];

    if (id) {
        sql += ' WHERE id = $1';
        values.push(id);
    }

    const result = await pool.query(sql, values);

    return id ? result.rows[0] ?? null : result.rows;
};

const updateEvent = async(title,description,venue,city,start_at,end_at,status,id)=>{

    const result = await pool.query(
         `UPDATE events
         SET
            title = COALESCE($1, title),
            description = COALESCE($2, description),
            venue = COALESCE($3, venue),
            city = COALESCE($4, city),
            start_at = COALESCE($5, start_at),
            end_at = COALESCE($6, end_at),
            status = COALESCE($7, status)
         WHERE id = $8
         RETURNING *`,
    [title,description,venue,city,start_at,end_at,status,id]
    )
    return result;
}
module.exports ={createEvent,updateEvent,eventDetail};