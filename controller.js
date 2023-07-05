const express=require('express');

const Product=require('./products');

const {json}=require('body-parser');

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