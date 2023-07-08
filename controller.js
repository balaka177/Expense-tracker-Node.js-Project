const express=require('express');

const Product=require('./products');

const {json}=require('body-parser');

const db=require('../util/database');
const { passError } = require('express-handlebars/lib/utils');

exports.home=(req,res)=>{
    res.sendFile('/home/vijay/Videos/expense_tracker-node.js/signup.html');
}

exports.add_data=(req,res)=>{
    const name=req.body.name;
    const gmail=req.body.gmail;
    const pwd=req.body.pwd;

    Product.findAll({gamil:req.body.gamil})
    .then((resp) =>{
        if(resp.length!=0){
            res.json('User already exist')
        }
        else{
            Product.create({
                name:name,
                gmail:gmail,
                password:pwd,
        

        })
        }

    
    })
    .catch(err =>{
        console.log(err);
    })
}

exports.login=async(req,res)=>{
     const a=await Product.findAll({where:{gmail:req.body.email} && {password:req.body.pwd}})
   //  const b=await Product.findAll({where:{password:req.body.pwd}})
    .then((resp)=>{
       
        if( resp.length>0){
        return res.json('User login successful');

    }   

    Product.findAll({where:{gmail:req.body.email} })
    .then((resp)=>{
        if(resp.length>0){
            return res.status(401).json('User not Authorized');
        }
        else{
            return res.status(404).json('User not found');
        }
    })
        })
}


exports.redirect=(req,res)=>{
    res.sendFile("/home/vijay/Videos/expense_tracker-node.js/login.html");
}