const jwt= require("jsonwebtoken");
const Register = require("../models/register")


const auth = async(req , res, next)=>{
    try{
    const token = req.cookies.jwt;
    const verfiyUser = jwt.verfiy(token, procees.env.SECRET_KEY)
    console.log(verfiyUser)

    const user = await Register.findOne({_id:verfiyUser._id})
    console.log(user)
    next()
    }
    catch(error){
    res.status(400).send(error)
    }
}

module.exports=auth;