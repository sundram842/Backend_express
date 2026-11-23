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
    pgm.createTable('bookings',{
        id:{
            type:'uuid',
            notNull:true,
            default:pgm.func("gen_random_uuid()")
        },
        event_id:{
            type:'uuid',
            references:"events",
            notNull:true,
            onDelete:'CASCADE'
        },
        user_id:{
            type:'uuid',
            references:"users"
        },
        expired_at:{
            type:'timestamptz',
            notNull:true
        },
        total_cents:{
            type:'integer',
            notNull:true
        },
        confirmed_at:{
             type:'timestamptz',
        },
        cancelled_at:{
             type:'timestamptz',
        },
        created_at:{
             type:'timestamptz',
             default:"now()",
             notNull:true
        },
        updated_at:{
            type:'timestamptz',
        }


    })
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {};
