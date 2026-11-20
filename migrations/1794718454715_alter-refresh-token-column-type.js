/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * Recreated: this migration was applied to the database but its file was lost.
 * It matches the schema it produced (user_id and replaced_by_token_id -> uuid).
 *
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
    pgm.alterColumn('refresh_token', 'user_id', {
        type: 'uuid',
        using: 'user_id::uuid',
    });
    pgm.alterColumn('refresh_token', 'replaced_by_token_id', {
        type: 'uuid',
        using: 'replaced_by_token_id::uuid',
    });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
    pgm.alterColumn('refresh_token', 'user_id', {
        type: 'text',
    });
    pgm.alterColumn('refresh_token', 'replaced_by_token_id', {
        type: 'varchar(255)',
    });
};
