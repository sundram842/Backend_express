const { pool } = require('../database/pool')

const createTicketType = async (name, price_cents, quantity_total, sales_end_at, event_id) => {
    const result = await pool.query(
        'INSERT INTO ticket_type (name,price_cents,quantity_total,sales_end_at,event_id) VALUES($1,$2,$3,$4,$5) RETURNING   name,price_cents,quantity_total,sales_end_at',
        [name, price_cents, quantity_total, sales_end_at, event_id]

    );
    return result.rows[0];
}

const updateTicket = async (name, price_cents, quantity_total, sales_end_at, id) => {
    const result = await pool.query(`UPDATE ticket_type
        SET 
        name = COALESCE($1,name),
        price_cents = COALESCE($2,price_cents),
        quantity_total = COALESCE($3,quantity_total),
        sales_end_at = COALESCE($4,sales_end_at),
        updated_at = now() where id = $5
         RETURNING *`,
        [name, price_cents, quantity_total, sales_end_at, id]);

    return result;

}

const byaTicket = async (id, quantity) => {
    const result = await pool.query(`UPDATE ticket_type SET 
        quantity_sold = quantity_sold + $2 where id = $1
        `, [id, quantity]);

    return result;

}

const ticketList = async (id) => {
    const result = await pool.query(
        `SELECT * FROM ticket_type where event_id =$1`,
        [id]
    )

    return result.rows;
}

const ticketDetail = async (id) => {
    const result = await pool.query('SELECT * FROM ticket_type WHERE ID =$1', [id]);
    return result.rows[0];
}

module.exports = { createTicketType, updateTicket, byaTicket, ticketDetail, ticketList }