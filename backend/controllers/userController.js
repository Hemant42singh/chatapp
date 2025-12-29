import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt  from "jsonwebtoken";

export const register = async(req, res)=>{
    try{
        const  {fullName, username, password, confirmPassword, gender}= req.body;
        if(!fullName || !username || !password || !confirmPassword || !gender){
            return res.status(400).json({message: " all fields are required"});
        }
        if(password != confirmPassword){
            return res.status(400).json({message: "password did not match"});
        }
        const user = await User.findOne({username});
        if(user){
            return res.status(400).json({message: "username already exist"});
        }

        const hashPassword = await bcrypt.hash(password, 10);
        //profile photo
          const maleProfilePhoto = `https://avatar.iran.liara.run/public/boy?username=${username}`;
          const femaleProfilePhoto = `https://avatar.iran.liara.run/public/girl?username=${username}`;
        await User.create({
            fullName,
            username,
            password:hashPassword,
            profilePhoto: gender === "male" ? maleProfilePhoto : femaleProfilePhoto,
            gender
        })
        
        return res.status(201).json({
            message:"account successfully created",
            success: true
        })
      
    }
    catch (error){
        console.log(error);
    }
};


export const login = async (req,res) =>{
    try{
         const {username, password} = req.body;
         if(!username || !password){
            return res.status(400).json({message: "all fields are required"});
         }
         
         const user = await User.findOne({username});
         if(!user){
            return res.status(400).json({
               message:"incorrect username or password",
               success: false
            })
         };
         const tokenData={
            userId: user._id // database mein jo user hoga uski id
         };
         const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {expiresIn: '1d'});// ab iss token ko borwser ki cookie mein store krna h
         return res.status(200).cookie("token", token,{maxAge:1*24*60*60*1000}).json({
            _id: user._id, // ye sb as a responce client side mein return horhi h
            username: user.username,
            fullName : user.fullName,
            profilePhoto : user.profilePhoto
         }) // the first one is cookie name  it can be anything, the second token is the data which is generated
         // life span is 1 day (in ms)
    }
    catch (error) {
        console.log(error);
    }


}


 export const logout = (req,res) =>{
        try{
            return res.status(200).cookie("token", "", {maxAge:0}).json({
                message: "logged out successfully"
            })
        }
        catch (error){
             console.log(error);
        }
    }

    export const getOtherUsers = async(req,res)=>{
        try{
             const loggedInUserId = req.id;
             const otherUsers = await User.find({_id:{$ne:loggedInUserId }}).select("-password");
             return res.status(200).json(otherUsers);
        }
        catch (error){
             console.log(error);
        }
    }