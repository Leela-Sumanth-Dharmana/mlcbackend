const mongoose=require('mongoose');

const userSchema=mongoose.Schema({
    "regno":{type:String},
    "email":{type:String},
    "password":{type:String},
    "image":{type:String}
},{
    collection:"user"
})

module.exports=mongoose.model("userSchema",userSchema);