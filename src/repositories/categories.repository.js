const {pool} = require("../database/pool");

const createCategory = async(name,slug,description)=>{
    const result = await pool.query(
        `INSERT INTO categories(name,slug,description) values($1,$2,$3)
        RETURNING id,name`,
        [name,slug,description]
    );

    return result.rows[0];

}

const updateCategory = async({name,slug,description,id}) =>{
    const result = await pool.query(
        `UPDATE categories SET name = COALESCE($1,name),
        slug = COALESCE($2,slug),
        description = COALESCE($3,description),
        updated_at = now() where id = $4
        RETURNING id,name,slug,description,created_at,updated_at`,

        [name,slug,description,id]
    );
    return result.rows[0] ?? null;
}

const categoryDetail = async(id) =>{
  const result = await pool.query(
    `select * from categories where id = $1`,
    [id]
  );

    return result.rows[0] ?? null;

}

const existingCategory =  async(name)=>{
    const result = await pool.query(
        `select * from categories where name = $1`,
        [name]
    )
    
    
    return result.rows[0] ?? null;
}

const getAllRepo = async()=>{
    const result = await pool.query(
        'select * from categories'
    );

    return result.rows ?? null;
}

module.exports = { createCategory, updateCategory, categoryDetail, existingCategory,getAllRepo };
