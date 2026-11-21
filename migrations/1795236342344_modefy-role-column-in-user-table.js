/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * Replace the enum-based users.role with a uuid FK to roles(id).
 * Existing users end up with role_id = NULL so roles can be assigned afterwards.
 *
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
    // Remove the old enum column/type (ifExists: they may already be absent)
    pgm.dropColumns('users', ['role'], { ifExists: true });
    pgm.dropType('role_type', { ifExists: true });

    pgm.addColumns('users', {
        role_id: {
            type: 'uuid',
            references: 'roles(id)',
            onDelete: 'RESTRICT',
        },
    });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
    pgm.dropColumns('users', ['role_id']);

    pgm.createType('role_type', ['attendee', 'organizer', 'admin']);
    pgm.addColumns('users', {
        role: {
            type: 'role_type',
        },
    });
};
