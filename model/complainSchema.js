const mongoose=require('mongoose');

const complainSchema=mongoose.Schema({
    "id":{type:String},
    "place":{type:String},
    "issue":{type:String},
    "description":{type:String},
    "image":{type:String},
    "status":{type:String}
},{
    collection:"complain"
})

module.exports=mongoose.model("complainSchema",complainSchema);