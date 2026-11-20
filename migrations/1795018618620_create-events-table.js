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
    pgm.createType('event_status', [
        "draft",
        "published",
        "cancelled"
    ])
    pgm.createTable('events', {
        id: {
            type: 'uuid',
            primaryKey: 'true',
            default: pgm.func("gen_random_uuid()")
        },
        category_id: {
            type: "uuid",
            references: "categories(id)",
            onDelete: "RESTRICT"
        },
        title: {
            type: 'varchar(150)',
            notNull: true,
        },
        description: {
            type: 'text'
        },
        venue: {
            type: "varchar(100)",
            notNull: "true",
        },
        city: {
            type: "varchar(100)",
            notNull: "true",
        },
        start_at: {
            type: 'timestamptz',
            notNull: 'true'
        },
        end_at: {
            type: 'timestamptz',
            notNull: 'true'
        },
        status: {
            type: 'event_status',
            notNull: 'true'
        },
        created_at: {
            type: 'timestamptz',
            notNull: 'true',
            default: pgm.func("now()")
        },
        updated_at: {
            type: 'timestamptz',
            notNull: 'true',
            default: pgm.func("now()")
        }
    })

    pgm.addConstraint("events", "Check_even_date", {
        check: "end_at > start_at"
    })
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => { };
