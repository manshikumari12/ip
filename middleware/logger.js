const {createLogger,format,transports}=require("winston")
const {combine,timestamp,label,printf}=format
const myformat=printf(({level,message,label,timestamp})=>{
    return `${timestamp}[${label}]${level}:${message}`
})
const logger=createLogger({
    format:combine(
        label({label:'logger'}),
        timestamp(),
        myformat
    ),
    transports:[new transports.File({
        filename:"app.log",
        level:'info'
    })]
})
function logrequest(req,res,next){
    const IP=req.socket.remoteaddress
    const Method=req.method
    const url=req.url
    console.log(Method,url,IP)
    logger.log({
        level:'info',
        message:`A ${Method} request made on "${url}" from IP${IP}`,
    })
    next()
}
module.exports={logger,logrequest}