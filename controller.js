const express=require('express');

const Product=require('./products');

const expense_table=require('./expense_table');

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
    const user=await Product.findAll({where:{gmail:req.body.gmail}})
        console.log(user)
        if( user.length>0){
            bcrypt.compare(password,user[0].password,(err,result)=>{
                if (err) throw err;
                //return res.json({success:true,message:'User login successful'});
                res.sendFile('/home/vijay/Videos/expense_tracker-node.js/Expenses.html');

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

exports.add_expense=(req,res) => {
    const cst=req.body.cst;
    const des=req.body.des;
    const cat=req.body.cat;

        expense_table.create({
            cost:cst,
            description:des,
            categeory:cat,
        })
        res.sendFile('/home/vijay/Videos/expense_tracker-node.js/Expenses.html');
}

exports.show_expenses=async(req,res) => {
    //const ul=document.getElementById('ul')
    const expenses=await expense_table.findAll()
    res.status(200).json({all:expenses});
    
}

exports.delete_user=async(req,res)=>{
    const id=req.params.id;
    await expense_table.destroy({where:{id:id}})
    
}
