import express from "express";
import User from "../models/User.js"; 


const checkLogin = async(req,res,next) => {
    const token = req.headers.token
    // let see if token is valid or not:
    if(!token){
        return res.json({error: "Please login first"})
    }
    try{
       const response = await User.findOne({token:token}) 
       if(!response){
           return res.json({error: "Please login first"})
       }
       else{
           req.user = response
            next()
       }
    }

    catch(err){
        console.log(err)
    }
    

};

export default checkLogin;