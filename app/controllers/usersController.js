import usersModel from "../model/usersModel.js";
import {tokenEncode} from "../utility/tokenUtility.js";
import UsersModel from "../model/usersModel.js";
import sendEmail from "../utility/emailUtility.js";


export const registration = async (req,res) =>{
    try{
        let reqBody = req.body;
        await usersModel.create(reqBody);
        return res.json({status:"success",message:"Successfully created"});
    }catch(err){
        return res.json({status:"failure",message:err});
    }
}

export const login = async (req,res) =>{
    try{
        let reqBody = req.body;
        let data = await usersModel.findOne(reqBody);
        if(data == null){
            return res.json({status:"failure", message:"User not found"});
        }
        else{
            let token = tokenEncode(data["email"],data["_id"]);
            return res.json({status:"success",message:"Login successful",data:{token:token}});
        }
    }catch(err){
        return res.json({status:"failure",message:err});
    }

}

export const profileDetails = async (req,res) =>{
    try{
       let user_id = req.headers['user_id'];
       let data = await UsersModel.findOne({"_id": user_id});
        return res.json({status:"success",message:"here is your profile", data:data});
    }catch(err){
        return res.json({status:"failure",message:err});
    }

}

export const profileUpdate = async (req,res) =>{
    try{
        let reqBody = req.body;
        let user_id = req.headers['user_id'];
        await usersModel.updateOne({"_id":user_id},reqBody);
        return res.json({status:"success",message:"Successfully updated"});
    }catch(err){
        return res.json({status:"failure",message:err});
    }

}

export const emailVerify = async (req,res) =>{
    // try{
    //     let email = req.params.email;
    //     let otpCode = Math.floor(10000+Math.random()*900000)
    //     // Query Is Email Exist
    //     const userCount = (await usersModel.aggregate([{$match:{email:email}},{$count:"total"}]))
    //     if(userCount.length>0){
    //         // Update Otp if user exist
    //         await usersModel.updateOne({email:email,otp:otpCode})
    //         // console.log(email);
    //         let sendData = await sendEmail(email,"Your Verification Code Is "+otpCode, "Inventory PIN Verification")
    //         console.log(sendData);
    //         return res.json({status:"success",message:"verification send successfully",data:sendData});
    //     }else{
    //         return {status:"fail",data:"No User Found!"}
    //     }
    //
    // }catch(e){
    //     return {status:"fail",data:e.toString()}
    // }
    try{
        let email = req.params.email;
        let data  = await usersModel.findOne({email: email});
        if(data == null){
            return res.json({status:"failure",message:"User not found"});
        }else{
            //send otp to email
            let code = Math.floor(100000+Math.random()*900000);
            let EmailTo = data['email'];
            let EmailText = "Your OTP code is "+ code;
            let EmailSubject = "Task Manager OTP code"
            await sendEmail(EmailTo,EmailText,EmailSubject);
            //update db otp for email
            await usersModel.updateOne({email: email},{otp:code});
            return res.json({status:"success",message:"Email verification successfull"});
        }
    }catch (err){
        return res.json({status:"failure",message:err});
    }
}

export const otpVerify = async (req,res) =>{
    try{
        let reqBody = req.body;
        let data = await usersModel.findOne({email: reqBody['email'],otp:reqBody['otp']});
        if(data == null){
            return res.json({status:"failure",message:"Wrong Verification Code"});
        }else if(data['otp']==="0"){
            return res.json({status:"success",message:"Enter correct otp code"});
        }
        else{
            return res.json({status:"success",message:"Verification successfull"});
        }
    }catch(err){
        return res.json({status:"failure",message:err});
    }

}

export const resetPassword = async (req,res) =>{
    try{
        let reqBody = req.body;
        let data = await usersModel.findOne({email: reqBody['email'],otp:reqBody['otp']});
        if(data == null){
            return res.json({status:"failure",message:"User not found"});
        }else if(data['otp'] === "0"){
            return res.json({status:"failure",message:"Enter correct otp code"});
        }
        else {
            await usersModel.updateOne({email:reqBody['email']},{otp:"0",password:reqBody['password']});
            return res.json({status:"success",message:"Password reset successfull"});
        }

    }catch(err){
        return res.json({status:"failure",message:err});
    }

}