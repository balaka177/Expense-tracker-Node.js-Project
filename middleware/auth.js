const jwt=require('jsonwebtoken');
const users=require('../model/users');

exports.authenticate=async(req,res,next)=>{
    try{
        const token=req.header('Authorization');
        const user=jwt.verify(token,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9')
        
        const data=await users.findByPk(user.UserId)
        //console.log(data)
        req.user=data;
        next();
        
    }catch(err){
        console.log(err)
    }
}