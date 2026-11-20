const { registerUser, getUser, userDetail } = require('../services/user.service');

// Express 5 forwards errors thrown here to the error handler
const createUser = async (req, res) => {
  const user = await registerUser(req.body);
  return res.status(201).json({
    success: true,
    message: 'User registered successfully',
    data: user,
  });
};

const getUsers = async (req,res) =>{
   const limit = Number(req.query.limit) || 10;
   const email = req.query.email || ''
    const user = await getUser(limit,email);
    return res.status(200).json({
        success: true,
        data: user,
    }) 
}

const userById = async (req,res) =>{
    const id = req.params.id;
    const user = await userDetail(id);
    return res.status(200).json({
        success: true,
        data: user,
    }) 
}



module.exports = { createUser, getUsers,userById };
