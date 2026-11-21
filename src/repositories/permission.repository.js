const { pool } = require('../database/pool');

const deletePermission = async (id, permissionArray) => {

    const result = await pool.query(
        'DELETE FROM role_permissions WHERE role_id = $1 and not (permission_id = ANY($2::UUID[]))',
        [id, permissionArray]
    )

    return result;
}

const addPermission = async (id, permissionArray) => {
const result = await pool.query(
  `INSERT INTO role_permissions (role_id, permission_id)
   SELECT $1::uuid, unnest($2::uuid[])
   ON CONFLICT (role_id, permission_id) DO NOTHING
   RETURNING role_id, permission_id`,
  [id, permissionArray]
);

    return result;
}

module.exports ={deletePermission,addPermission}