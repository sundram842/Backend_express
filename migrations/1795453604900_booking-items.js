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
    pgm.createTable('booking_items', {
        id: {
            type: 'uuid',
            notNull: true,
            default: pgm.func("gen_random_uuid()")
        },
        booking_id: {
            type: 'uuid',
            notNull: true,
            references: "bookings"
        },
        ticket_type_id: {
            type: 'uuid',
            notNull: true,
            references: 'ticket_type'
        },
        quantity: {
            type: 'integer',
            notNull: true,
        },
        unit_price_cents: {
            type: 'integer',
            notNull: true,
        }
    })
    pgm.addConstraint('booking_items','unit_price_cents',{
        check: 'unit_price_cents >= 0'
    })

      pgm.addConstraint('booking_items','quantity',{
        check: 'quantity >= 0'
    })
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => { };
