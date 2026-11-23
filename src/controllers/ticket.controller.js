const {ticketCreate,ticketUpdate,ticketBooking,detailTicket,listTicket} = require('../services/ticket.service');

const createTicket = async(req,res)=>{
    const id = req.params.id;
   const result = await ticketCreate(req.body,id);
   return res.status(201).json({
    success:true,
    message:"ticket created successfully",
    data:result
   })
}

const ticketDetail = async (req,res)=>{
    const id = req.params.id;
    const result = await detailTicket(id);
    res.status(200).json({
        success:'true',
        data:result
    })

}

const ticketList = async(req,res)=>{
    const id = req.params.id;
    const result = await listTicket(id);
    res.status(200).json({
        success:"true",
        data:result
    })
}

module.exports ={createTicket,ticketDetail,ticketList}