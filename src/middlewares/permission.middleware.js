
const { verifyAccessToken } = require('../services/jwt.service');
const {getUserDetail} =  require('../repositories/user.repository');
const {getAllPermission} =require('../repositories/permission.repository')


const checkPermission =  (permissionCode) => {
    return async (req, res, next) =>{
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(400).json({
            success: false,
            message: 'Authenticate token is required'
        })
    }
    const token = authHeader.split(' ')[1];
    const decode = verifyAccessToken(token);
    const id = decode.sub;
    const user = await getUserDetail(id);
    const role = user.role_id;
    const permissionArray = await getAllPermission(role);
    const isPermission = permissionArray.find((id)=>id.permission_id === permissionCode);
    if(!isPermission){
        const error = new Error('Not permited')
        error.status = 400;
        throw error;
    }else{
        next();
    }

    }

}

module.exports = {checkPermission};