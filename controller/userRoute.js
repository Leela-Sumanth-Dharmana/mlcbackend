const nodemailer = require('nodemailer');
// const Mailgen = require('mailgen');
const bcrypt = require('bcryptjs');

const express = require("express");
const mongoose = require("mongoose");

const userRoute = express.Router();
const userSchema = require('../model/userSchema');

let email = ''
let OTP = "";
userRoute.post("/createuser", (req, res) => {
    const userEmail = req.body.email;
    let flag = false;
    userSchema.findOne({ email: userEmail })
        .then((response) => {
            // console.log(response, flag + "lksdf");
            if (response != null) {
                res.status(201).json({
                    msg: "Already Registered"
                })
            }
            else {
                flag = true;
                const regex = /^[a-zA-Z]+\.(\d{2})[a-zA-Z]{3}\d{1,5}@vitapstudent\.ac\.in$/
                if (!userEmail.match(regex)) {
                    return res.status(202).json({ msg: "Invalid format" })
                }
                else {


                    const config = {
                        host: 'smtp-mail.outlook.com', // Outlook SMTP server
                        port: 587, // Port for TLS (587 is recommended for Outlook)
                        secure: false, // true for 465, false for other ports
                        auth: {
                            user: 'workingpractice999@hotmail.com', // Your Yahoo email address
                            pass: 'Dummy#000' // Your Yahoo email password
                        }
                    };

                    let transporter = nodemailer.createTransport(config);

                    email = userEmail
                    const digits = '0123456789'
                    let otp = "";
                    const limit = 6
                    for (var i = 0; i < limit; i++) {
                        otp += digits[Math.floor(Math.random() * 10)]
                    }
                    console.log(otp);
                    OTP = otp

                    let message = {
                        from: "workingpractice999@hotmail.com",
                        to: userEmail,
                        subject: "OTP Verification",
                        html: '<h1>'+otp+'</h1>' + '<h1>Please do not share your OTP with others</h1>'
                    }
                    
                    transporter.sendMail(message).then(() => {
                        return res.status(200).json({
                            msg: "you should receive an email"
                        })
                    }).catch(error => {
                        console.log(error);
                        return res.status(500).json({ error })
                    })
                }
            }
        })
        .catch((error) => { console.log(error) })
})

userRoute.post("/verifyuser", (req, res) => {
    const userOTP = req.body.otp;
    // const data = { 'email': email, 'password': password };
    console.log(userOTP, OTP)
    if (userOTP === OTP) {
        res.status(200).json({ msg: "Verified" })
    }
    else {
        res.status(201).json({ error: 'Invalid OTP' })
    }
})
userRoute.post('/create', (req, res) => {
    
    const saltRounds = 10; // Salt rounds for bcrypt
    bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
        if (err) {
            return err;
        }
        // Save 'hash' to the database
        console.log(req.body.password,hash)
        let email=req.body.email;
        let reg=''
        let flag=0
        for(let i=0;i<email.length;i++){
            
            if(flag===1){
                if(email[i]=='@'){
                    break
                }
                reg+=email[i];
            }
            else if(email[i]=='.'){
                flag=1;
            }
        }
        let regno=reg.toUpperCase()
        const data={"regno":regno,'email':req.body.email,'password':hash};
        userSchema.create(data, (err, data) => {
            if (err) {
                return err
            }
            else {
                try {
                    const data = userSchema(req.body);
                    res.json(data);
                } catch (err) {
                    res.status(500).json({ error: err.message });
                }
            }
        })
    });
   
})
userRoute.get('/getuser', (req, res) => {
    userSchema.find((err, data) => {
        if (err) {
            return err;
        }
        else {
            res.json(data);
        }
    })
})
userRoute.route("/updateuser/:id")
    .get((req, res) => {
        userSchema.findById(mongoose.Types.ObjectId(req.params.id), (err, data) => {
            if (err) {
                return err;
            }
            else {
                res.json(data);
            }
        })
    }).put((req, res) => {
        userSchema.findByIdAndUpdate(mongoose.Types.ObjectId(req.params.id), { $set: req.body }, (err, data) => {
            if (err) {
                return err;
            }
            else {
                res.json(data);
            }
        })
    })
userRoute.post('/login',(req,res)=>{
    if(req.body.email==='adminclg@gmail.com' && req.body.password==="vitadmin@clg"){
        return res.status(202).json({msg:"admin"})
    }
    else if(req.body.email==='adminhostel@gmail.com' && req.body.password==="vitadmin@hostel"){
        return res.status(203).json({msg:"admin"});
    }
    else{
    userSchema.findOne({'email':req.body.email})
    .then(response=>{
        if(response){
            console.log(req.body.password,response.password)
            bcrypt.compare(req.body.password, response.password, (err, result) => {
                if (err) {
                    return err;
                }
                if (result) {
                    res.status(200).json(response);
                } else {
                    // Passwords don't match, authentication failed
                    res.status(201).json({msg:'Incorrect Password'})
                }
            });
        }
    })
}
})

module.exports = userRoute;