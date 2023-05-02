const jwt= require("jsonwebtoken")
//const { } = require("redis")
const client=require("../helper/redis")
const authentication=async(req,res,next)=>{
    try{
        const token=req.headers?.authorization.split(" ")[1]
        if(!token) return res.status(401).send("plesae login again")
        const istoken=jwt.verify(token,process.env.JWT_SECRET)
        if(!istoken) return ressend("authentication fail please login ")
        const tokenblacklisted=await client.get(token)
        if(tokenblacklisted) return res.send("unauthorized")
        req.body.userID=istoken.userID
        req.body.city=istoken.city
        next()
    }catch(err){
        res.send(err.message)
    }
}
module.exports={authentication}