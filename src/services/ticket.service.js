const { createTicketType, updateTicket, byaTicket, ticketDetail, ticketList } = require('../repositories/tivket_type.repository');

const error = (errorCode, message) => {
    const error = new Error(`${message}`);
    error.status = errorCode;
    return error;
}

const ticketCreate = async ({ name, price_cents, quantity_total, sales_end_at }, event_id) => {

    if (!event_id) {
        throw error(400, 'event id is required')
    }

    if (price_cents < 0) {
        throw error(400, 'price must be 0 or positive number')
    }

    if (!name.trim()) {
        throw error(400, 'Name is required')
    }

    if (name.trim() > 100) {
        throw error(400, 'Name length should not exceed')
    }

    if (quantity_total < 0) {
        throw error(400, 'quantity_total must be 0 or positive number')
    }

    const result = await createTicketType(name, price_cents, quantity_total, sales_end_at, event_id);

    return result;

}

const ticketUpdate = async ({ name, price_cents, quantity_total, sales_end_at }, id) => {
    name = name ?? null;
    price_cents = price_cents ?? null;
    quantity_total = quantity_total ?? null;
    sales_end_at = sales_end_at ?? null;

    if (!id) {
        throw error(400, 'id is required')
    }

    const result = await updateTicket(name, price_cents, quantity_total, sales_end_at, id)

    return result;


}

const ticketBooking = async ({ quantity }, id) => {
    if (!id) {
        throw error(400, 'id is required')
    }

    const ticketDetail = await ticketDetail(id);

    const availableQuantity = (ticketDetail.quantity_total) - (quantity_sold);

    if (quantity < 0 || quantity >= availableQuantity) {
        throw error(400, 'quantity must be in between more than 0 and less or equal to availableQuantity')
    }

    const result = await byaTicket(id, quantity)

}

const detailTicket = async (id) => {
    if (!id) {
        return error(400, 'id is required');
    }
    const result = await ticketDetail(id);
    return result

}

const listTicket = async (id) => {
    if (!id) {
        return error(400, 'Id is required');
    }
    const result = await ticketList(id);
    return result;
}



module.exports = { ticketCreate, ticketUpdate, ticketBooking, detailTicket,listTicket }