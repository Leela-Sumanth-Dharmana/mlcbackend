const express=require("express")

const app = express()
const mongoose=require('mongoose')
const bodyParser=require("body-parser")
const cors=require("cors")
const userRoute=require("./controller/userRoute.js")
const complainRoute =require('./controller/complainRoute.js')

mongoose.set('strictQuery', true);
mongoose.connect("mongodb+srv://leelasumanth999:9110793549@cluster0.lceyukw.mongodb.net/Users");

var db=mongoose.connection
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors())

app.use('/route',userRoute)
app.use('/route',complainRoute)

db.on('open',()=>console.log("Connected to DB"));
db.on('error',()=>console.log("Error Occured"));

app.listen(4000,()=>{
    console.log("Server Started at 4000");
})