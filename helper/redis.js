const redis=require("redis")
const ioredis=require("ioredis")
const client=redis.createClient()
client.on("connect",async()=>{
    console.log("connected to redis")
})
client.on("err",(err)=>{
    console.log(err.message)
})
client.connect()
module.exports=client