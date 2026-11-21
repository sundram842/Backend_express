/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * Superseded by 1795236342344 (role becomes a uuid FK to roles).
 * Written to be re-runnable: the enum/column may already exist in the DB.
 *
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
    pgm.sql(`
        DO $$ BEGIN
            CREATE TYPE role_type AS ENUM ('attendee', 'organizer', 'admin');
        EXCEPTION WHEN duplicate_object THEN NULL;
        END $$;
    `);

    pgm.addColumns('users', {
        role: {
            type: 'role_type'
        }
    }, { ifNotExists: true });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
    pgm.dropColumns('users', ['role'], { ifExists: true });
    pgm.dropType('role_type', { ifExists: true });
};
