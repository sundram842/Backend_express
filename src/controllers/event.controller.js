const {eventCreate,eventUpdate,detailEvent} = require('../services/event.service');

const createEvents = async(req,res)=>{
    const result = await eventCreate(req.body);
    return res.status(201).json({
        success:true,
        message:'Event create successfully',
        data:result.rows[0]
    })
}

const updateEvent = async(req,res)=>{
    const id = req.params.id;
    const result = await eventUpdate(req.body,id);
    return res.status(200).json({
        success:true,
        message:"Update success",
        data:result
    })
}

const eventDetail = async(req,res)=>{
    const id = req.params.id;
    const result = await detailEvent(id);
    return res.status(200).json({
        success:true,
        data:result
    })

}

module.exports = {createEvents,updateEvent, eventDetail};