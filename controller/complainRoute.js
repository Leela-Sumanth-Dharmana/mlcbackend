const express=require('express');
const mongoose=require('mongoose');

const complainSchema=require("../model/complainSchema");
const complainRoute=express.Router();

complainRoute.post("/createcomplain",(req,res)=>{
    complainSchema.create(req.body,(err,data)=>{
        if(err){
            return err;
        }
        else{
            try {
                const data = complainSchema(req.body);
                res.json(data);
            } catch (err) {
                res.status(500).json({ error: err.message });
            }
        }
    })
})

complainRoute.get("/getcomplaints/:id",(req,res)=>{
    complainSchema.find({id:req.params.id})
    .then((response)=>{
        // console.log(response)
        return res.status(200).json(response)
    })
    .catch((err)=>{console.log(err)})
    
})
complainRoute.get("/getcomplaintss/:id",(req,res)=>{
    complainSchema.find({id:req.params.id,status:"3"})
    .then((response)=>{
        // console.log(response)
        return res.status(200).json(response)
    })
    .catch((err)=>{console.log(err)})
    
})
complainRoute.get("/getcomplaintsp/:id",(req,res)=>{
    complainSchema.find({id:req.params.id,status:{$in:["0","1","2"]}})
    .then((response)=>{
        // console.log(response)
        return res.status(200).json(response)
    })
    .catch((err)=>{console.log(err)})
    
})

complainRoute.get("/getclgcomplaintss",(req,res)=>{
    complainSchema.find({place:"College",status:"3"})
    .then((response)=>{
        // console.log(response)
        return res.status(200).json(response)
    })
    .catch((err)=>{console.log(err)})
    
})
complainRoute.get("/gethstlcomplaintss",(req,res)=>{
    complainSchema.find({place:"Hostel",status:"3"})
    .then((response)=>{
        // console.log(response)
        return res.status(200).json(response)
    })
    .catch((err)=>{console.log(err)})
    
})
complainRoute.get("/getclgcomplaintsu",(req,res)=>{
    complainSchema.find({place:"College",status:{$in:["0","1","2"]}})
    .then((response)=>{
        // console.log(response)
        return res.status(200).json(response)
    })
    .catch((err)=>{console.log(err)})
    
})
complainRoute.get("/gethstlcomplaintsu",(req,res)=>{
    complainSchema.find({place:"Hostel",status:{$in:["0","1","2"]}})
    .then((response)=>{
        // console.log(response)
        return res.status(200).json(response)
    })
    .catch((err)=>{console.log(err)})
    
})
complainRoute.get("/getclgcomplaints",(req,res)=>{
    complainSchema.find({place:"College"})
    .then((response)=>{
        // console.log(response)
        return res.status(200).json(response)
    })
    .catch((err)=>{console.log(err)})
    
})
complainRoute.get("/gethstlcomplaints",(req,res)=>{
    complainSchema.find({place:"Hostel"})
    .then((response)=>{
        // console.log(response)
        return res.status(200).json(response)
    })
    .catch((err)=>{console.log(err)})
    
})
complainRoute.route("/updatestatus/:id")
.get((req,res)=>{
    complainSchema.findById(mongoose.Types.ObjectId(req.params.id),(err,data)=>{
        if(err){
            return err;
        }
        else{
            res.json(data);
        }
    })
}).put((req,res)=>{
    complainSchema.findByIdAndUpdate(mongoose.Types.ObjectId(req.params.id),{$set: req.body},(err,data)=>{
        if(err){
            return err;
        }
        else{
            res.json(data);
        }
    })
})

complainRoute.delete("/deletecomplaint/:id",(req,res)=>{
    complainSchema.findByIdAndRemove(mongoose.Types.ObjectId(req.params.id),(err,data)=>{
        if(err){
            return err;
        }
        else{
            return res.json(data);
        }
    })
})


module.exports=complainRoute