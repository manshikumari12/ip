const Mongoose=require("mongoose")
//mongoose.set("strictQuery",false)

require("dotenv").config();
const connection =() => Mongoose.connect(process.env.mongo_uri)

module.exports={connection}