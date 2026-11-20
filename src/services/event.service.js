const { createEvent, updateEvent, eventDetail } = require('../repositories/event.repository');

const createError = (error_code = 400, message) => {
    const error = new Error(`${message}`)
    error.status = error_code;
    return error;
}

const eventCreate = async ({ title, description, venue, city, start_at, end_at, status,
    category_id }) => {

    let normalizeDescription = description.trim();
    let normalizeVenue = venue && venue.trim();
    let normalizeCity = city.trim();
    let normalizeStart_at = start_at.trim();
    let normalizeEnd_at = end_at.trim();

    if (!category_id.trim()) {
        const error = createError(400, 'id is required')
        throw error;
    }

    if (typeof title !== 'string' || !title.trim()) {
        const error = new Error('title is required');
        error.status = 400;
        throw error;
    }

    if (title.trim().length > 150) {
        const error = new Error('title length is exceed more than 150');
        error.status = 400;
        throw error;
    }
    if (!normalizeVenue) {
        const error = new Error('venue is required');
        error.status = 400;
        throw error;
    }

    if (!normalizeVenue.length > 150) {
        const error = new Error('venue is exceed the 150 length');
        error.status = 400;
        throw error;
    }

    if (!normalizeCity) {
        const error = new Error('city is required');
        error.status = 400;
        throw error;
    }

    //You can’t create events in the past.

    const now = new Date();

    const formatter = new Intl.DateTimeFormat('sv-SE', {
        timeZone: 'Asia/Kolkata',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hourCycle: 'h23'
    });

    const localDateTime = formatter.format(now)
        .replace(' ', 'T');

    const timestamp = `${localDateTime}+05:30`;


    if (start_at < timestamp) {
        const error = new Error('event will not start in past');
        error.status = 400;
        throw error
    }

    if (start_at > end_at) {
        const error = new Error('city is required');
        error.status = 400;
        throw error;
    }


    if (normalizeCity.length > 100) {
        const error = new Error('city is exceed 100 length');
        error.status = 400;
        throw error;
    }

    if (!normalizeStart_at) {
        const error = new Error('start time is required');
        error.status = 400;
        throw error;
    }

    if (!normalizeEnd_at) {
        const error = new Error('end time is required');
        error.status = 400;
        throw error;
    }

    const result = await createEvent(title, normalizeDescription, normalizeVenue, normalizeCity, normalizeStart_at, normalizeEnd_at, status, category_id);

    return result;

}


const eventUpdate = async ({ title, description, venue, city, start_at, end_at, status,
     }, id) => {

        const nTitle = title ?? null;
        const nDescription = description ?? null;
        const nVenue = venue ?? null;
        const nCity = city ?? null;
        const nStart_at = start_at ?? null;
        const nEnd_at = end_at ?? null;
        const nStatus = status ?? null;

        const result = await updateEvent(nTitle,nDescription,nVenue,nCity,nStart_at,nEnd_at,nStatus,id);

        return result;
}

const detailEvent = async(id)=>{
//    if(!id){
//     const error = new Error('id is required');
//     error.status = 400;
//     throw error;
//    }
    const result = await eventDetail(id);
    return result;
}

const ChangeEventStatus = async(id)=>{
    if(!id){
        const error =new Error('Id is required');
        error.status = 400;
        throw error;
    }

    const isCancel = await detailEvent(id)

}


module.exports = { eventCreate, eventUpdate, detailEvent };