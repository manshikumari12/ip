const mongoose=require("mongoose")
const searchschema= mongoose.Schema({
    ipaddress:String,
    city:String,
    timestamp:{type:Date,default:Date.now}
})
const SearchModel=mongoose.model("search",searchschema)
module.exports={
    SearchModel
}