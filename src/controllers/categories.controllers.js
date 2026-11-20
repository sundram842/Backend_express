const {createRepo,getRepoById,updateRepo,allCategories} = require('../services/categories.service');

const createRepository = async(req,res)=>{
    const result = await createRepo(req.body);
    return res.status(201).json({
        success:'true',
        data:result
    })
}

const updateRepository = async(req,res)=>{
    const result = await updateRepo(req.params.id, req.body);
    return res.status(200).json({
        success:true,
        data:result
    })
}

const getRepoDetail = async(req,res)=>{

    const result = await getRepoById(req.params.id);
    return res.status(200).json({
        success:true,
        data:result
    })
}

const allCategory = async(req,res)=>{
    const result = await allCategories();
    return res.status(200).json({
        success:'true',
        data:result
    })
}



module.exports = {createRepository,updateRepository,getRepoDetail,allCategory}