import {JWT_EXPIRY_TIME, JWT_KEY} from "../config/config.js";
import jwt from "jsonwebtoken";

export const tokenEncode = (email,_id) =>{
    const KEY = JWT_KEY;
    const EXPIRE = {expiresIn:JWT_EXPIRY_TIME};
    const PAYLOAD = {email: email, user_id : _id};
    return jwt.sign(PAYLOAD, KEY, EXPIRE);
}

export const tokenDecode = (token) =>{
    try{
        // console.log(token);
        // console.log(jwt.verify(token, JWT_KEY));
        return jwt.verify(token,JWT_KEY);
    }catch(err){
        return null;
    }

}