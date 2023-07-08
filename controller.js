const express=require('express');

const Product=require('./products');

const {json}=require('body-parser');

const db=require('../util/database');

const bcrypt=require('bcrypt');

const { passError } = require('express-handlebars/lib/utils');

exports.home=(req,res)=>{
    res.sendFile('/home/vijay/Videos/expense_tracker-node.js/signup.html');
}

exports.add_data=(req,res)=>{
    const name=req.body.name;
    const gmail=req.body.gmail;
    const pwd=req.body.pwd;

    Product.findAll({where:{gmail:gmail}})
    .then((resp) =>{
        if(resp.length!=0){
            res.json('User already exist')
        }
        else{
            bcrypt.hash(pwd,10,async(err,hash)=>{
                console.log(err);
            
            await Product.create({
                name:name,
                gmail:gmail,
                password:hash,
        
            })
            res.status(201).json({message:'Successfully created new User'})
        })
        }

    
    })
    .catch(err =>{
        console.log(err);
    })
}

exports.login=async(req,res)=>{
    try{
    const password=req.body.pwd;
    const user=await Product.findAll({where:{gmail:req.body.email}})
        console.log(user)
        if( user.length>0){
            bcrypt.compare(password,user[0].password,(err,result)=>{
                if (err) throw err;
                return res.json({success:true,message:'User login successful'});

            })
        }
        else{
            return res.status(401).json({success:false,message:'User not Authorized'});
        }
        if(user.length<=0){
            return res.status(404).json({success:false,message:'User does not exist'});
        }
       
}catch(err){
    console.log(err)
} 


}



exports.redirect=(req,res)=>{
    res.sendFile("/home/vijay/Videos/expense_tracker-node.js/login.html");
}