const express=require("express")

const {connection} =require("./config/db")
const {userRouter}=require("./route/userroute")
const {router}=require("./route/ipinforoute")
const client=require("./helper/redis")
const logger=require("./middleware/logger")
const {logrequest}=require("./middleware/logger")
require("dotenv").config()
const PORT=process.env.PORT||7000
const app=express()
app.use(express.json())


app.get("/",async(req,res)=>{
    res.send("evaluation -4")
})
app.use("/api/user",userRouter)
app.use("/api/ip",router)


app.listen(PORT,async()=>{
try{
    await connection()
    console.log("connected to db")
}catch(err){
    console.log(err.message)
    //logger.log("error","data connect falied")

}
console.log("connected to server")
})