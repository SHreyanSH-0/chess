const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user")
const dotenv = require("dotenv");
dotenv.config();

async function register(req,res){
    try{
        if(req.body == undefined){
            res.json({
                message : "invalid arg",
            });
            return;
        }
        const {name,email,password} = req.body;
        const userExists = await User.findOne({email});
        if(userExists){
            res.status(400).json({"err":"user already exists"});
            throw new Error("User Already Exists");
            return;
        }

        const salt = await bcrypt.genSalt(10);

        const enPassword = await bcrypt.hash(password, salt);

        const u = new User({
            name,
            email,
            password : enPassword,
        });

        const saveUser = await u.save();

        res.status(201).json({
            id:saveUser._id,
            name:saveUser.name,
            email:saveUser.email,
        })
    }
    catch (err){
        console.log(err);
    }
}


async function login(req,res) {
    try{
        if(req.body == undefined){
            res.json({
                message : "invalid arg",
            });
            return;
        }
        const {email,password} = req.body;
        const user = await User.findOne({email});
        // console.log(user.password);
        if(user && await bcrypt.compare(password,user.password)){
            const token = jwt.sign(
                {id:user._id},
                process.env.my_secret_key,
                {expiresIn:"30d"},
            )

            res.json({
                id:user._id,
                name:user.name,
                email:user.email,
                token
            });
        }
        else{
            res.send("USER NOT FOUND");
        }

    }
    catch(err){
        console.log(err);
    }
}

function validateToken(req,res){
    try{
        const {token} = req.body;
        const decoded = jwt.verify(token,process.env.my_secret_key);
        res.json({
            verified : true
        })
    }
    catch(err){
        res.json({
            err : "ERROR LOGIN AGAIN"
        });
    }
}



module.exports = {register,login,validateToken};