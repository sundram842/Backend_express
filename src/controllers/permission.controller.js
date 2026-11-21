const {permissionAdd,permissionDelete} = require('../services/permission.service');

const deletePermission = async(id,permissionArray) =>{
    const result = await permissionDelete(id,permissionArray);
   

}

const addPermission = async(req,res) =>{
    const id = req.params.id;
    deletePermission(id,req.body);
    const result = await permissionAdd(id,req.body);
    return res.status(200).json({
        success: true,
        data:result
    })

}



module.exports = {addPermission,deletePermission}