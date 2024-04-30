const User=require('../models/userModel');
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require('jsonwebtoken');




//get single user
const getSingleUser=async(req,res)=>{
    const {id}=req.params;
    try{
        const user=await User.findOne({_id:id})
        res.status(200).json(user);
    }catch (e) {
        res.status(404).json({error:e.message})
    }
}

//change password
const changePassword=async(req,res)=>{
    const {id}=req.params;
    const {currentPassword,newPassword}=req.body
    try{
        const user = await User.findById(id);

        if (!user){
            throw new Error('User not found')
        }

        const passwordMatch = await bcrypt.compare(currentPassword, user.password);

        if (!passwordMatch){
            throw new Error('Current password not match')
        }
        if (!validator.isStrongPassword(newPassword)){
            throw new Error('New password is not strong enough');
        }


        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedNewPassword;

        await user.save();

        res.status(200).json(user);
    }catch (e) {
        res.status(404).json({error:e.message})

    }
}






//login route

const login = async (req, res) => {
    const {email, password} = req.body;
try {


    if (!email || !password) {
        throw Error('All fields must be filled');
    }



        const user = await User.findOne({email})

        if (!user) {
            throw Error('Incorrect email');
        }
        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            throw Error('Incorrect password');
        }

        res.status(200).json(user)
    }catch (e) {
        return res.status(401).send({error: e.message});
    }
}

//register route
const signup = async (req, res) => {
    const {email, password,firstName} = req.body;
    const exists = await User.findOne({email});
    try{
        if (exists){
            throw Error('User already exists');
        }
        if (!email || !password || !firstName ) {
            throw Error('All fields must be filled');
        }
        if (!validator.isEmail(email)){
            throw Error('Email is not valid');
        }
        if (!validator.isStrongPassword(password)){
            throw Error('Password is not strong enough');
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const signup = await User.create({email, password:hashedPassword,firstName})
        const token = jwt.sign({ userId: signup._id }, 'YOUR_SECRET_KEY', { expiresIn: '1h' });

        res.status(200).json({ user: signup, token });
    }catch (e) {
        res.status(404).json({error:e.message})
    }

}

//update route
const update=async (req,res)=>{
    const {id}=req.params

    try {
        const update= await User.findByIdAndUpdate({_id:id},{
            ...req.body
        })

        if (!update) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json(update);

    }catch (e) {
        res.status(404).json({error:e.message})
    }

}






module.exports={
    login,
    signup,
    update,
    getSingleUser,
    changePassword
}
