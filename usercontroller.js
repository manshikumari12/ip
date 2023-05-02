const user=require("../models/usermodel")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const client=require("../helper/redis")

const signup=async(req,res)=>{
    try{
        const{name,email,password,city}=req.body
        const isuser=await user.findOne({email})
        if(isuser) return res.send("user already register")
        const hash=await bcrypt.hash(password,8)
        const newuser= new user ({name,email,password:hash,city})
        await newuser.save()
        res.send("signup successful")
    }catch(err){
        res.send(err.message)
    }
}

const login=async(req,res)=>{
    try{
        const{email,password}=req.body
        if(!isuser) return res.send("please register first")
        const ispass=await bcrypt.compare(password,isuser.password)
        if(!ispass) return res.send("invalid credentials")
        const token= await jwt.sign ({userId:isuser._id,city:isuser.city},process.env.JWT_secret,{expireIn:"1hr"})
        res.send({message:"login successfull",token})
    }catch(err){
        res.send(err.message)
    }
}
const logout=async(req,res)=>{
    try{
        const token=req.headers?.authorization.split(" ")[1]

        if(!token) return res.status(403)
        await client.set(token,token)
        res.send("logout successful") 
    }catch(err){
        res.send(err.message)
    }
}

module.exports={login,logout,signup}