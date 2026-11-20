/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
    pgm.createTable('refresh_token', {
        id: {
            type: 'uuid',
            primaryKey: true,
            default: pgm.func("gen_random_uuid()")

        },
        user_id: {
            type: "TEXT",
            notNull: true,
            unique: true,
            references:"'users(id)'",
        onDelete: 'CASCADE',
        },
        token_hash:{
            type: "varchar(255)",
             unique: true,
        },
        expires_at:{
            type:"timestamp"
        },revoked_at:{
            type:"timestamp"
        },created_at:{
             type:"timestamp",
             default: pgm.func("now()"),

        },replaced_by_token_id:{
            type:"varchar(255)"
        }
        
    })

};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {

};
