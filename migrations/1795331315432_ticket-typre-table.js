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
    pgm.createTable('ticket_type',{
        id:{
            type:'uuid',
            primaryKey: 'true',
            default: pgm.func("gen_random_uuid()")

        },
        event_id:{
            type:'uuid',
            references:"events(id)",
           onDelete: 'CASCADE',
        },
        price_cents:{
            type:'numeric(10,2)',
            notNull:true,
            default:0
        },
        name:{
            type:'varchar(100)',
            notNull:true
        },
        quantity_total:{
            type:'integer',
            notNull:true,
            default:0
        },
        quantity_sold:{
            type:'integer',
            notNull:true,
            default:0
        },
        sales_end_at:{
            type:'timestamptz'
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

    pgm.addConstraint('ticket_type','quantity_sold',{
       check: "quantity_total >= quantity_sold" 
    });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {};
