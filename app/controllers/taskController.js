import tasksModel from "../model/tasksModel.js";
import mongoose from "mongoose";

export const createTask = async (req,res) =>{
    try{
        let user_id = req.headers['user_id'];
        let reqBody = req.body;
        reqBody.user_id = user_id;
        await tasksModel.create(reqBody);
        return res.json({status:"success",message:"Successfully created task"});
    }catch(err){
        return res.json({status:"failed",message:err.toString()});
    }
}

export const updateTaskStatus = async (req,res) =>{
    try{
        let id = req.params.id;
        let status = req.params.status;
        let user_id = req.headers["user_id"];
        await tasksModel.updateOne({_id: id,user_id: user_id},{status: status});
        return res.json({status:"success",message:"Successfully updated task"});

    }catch(err){
        return res.json({status:"failure",message:err.toString()});
    }

}

export const taskListByStatus = async (req,res) =>{
    try{
        let status = req.params.status;
        let user_id = req.headers["user_id"];
        let data = await tasksModel.find({user_id: user_id,status:status});
        if(data.length == 0){
            return res.json({status:"failure",message:"there is no task on that status"});
        }else{
            return res.json({status:"success",message:"here is the task list", data:data});
        }
    }catch (err) {
        return res.json({status:"failure",message:err.toString()});
    }
}

export const deleteTask = async (req,res) =>{
    try{
        let id = req.params.id;
        let user_id = req.headers["user_id"];
        await tasksModel.deleteOne({_id: id, user_id: user_id});
        return res.json({status:"success",message:"Successfully deleted task"});

    }catch(err){
        return res.json({status:"failed",message:err.toString()});
    }
}

export const countTask = async (req,res) =>{
    try{
        let Object_id = mongoose.Types.ObjectId;
        let user_id = new Object_id(req.headers["user_id"]);
        let data = await tasksModel.aggregate([
            {$match: {user_id: user_id}},
            {$group:{_id:"$status",total:{$count:{}}}}
        ])
        return res.json({status:"success",message:"here is your result",data:data});

    }catch(err){
        return res.json({status:"failure",message:err.toString()});
    }

}