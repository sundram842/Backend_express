const {addPermission,deletePermission} = require('../repositories/permission.repository');

const permissionAdd = async(id,permissionArray)=>{
    if(!id){
        const error = new Error('id is required')
        error.status = 400;
        throw error;
    }
    
    const permission = permissionArray.permission;

    const result = await addPermission(id, permission);

    return result;
}

const permissionDelete = async(id,permissionArray) =>{
     if(!id){
        const error = new Error('id is required')
        error.status = 400;
        throw error;
    }

      const permission = permissionArray.permission;

    const result = await deletePermission(id,permission);

    return result;
}

module.exports = {permissionAdd, permissionDelete}
