const users=require('../model/users');
const expense_table=require('../model/expenses');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const db=require('../util/database');



exports.home=(req,res)=>{
    res.sendFile(process.cwd()+'/login.html');
}

exports.signup_html=(req,res)=>{
    res.sendFile(process.cwd()+'/signup.html');
}
exports.login_html=(req,res)=>{
    res.sendFile(process.cwd()+'/login.html');
}

exports.signup=async(req,res,next)=>{
    try{
        const name=req.body.name;
        const gmail=req.body.gmail;
        const password=req.body.password;

        if(name==="" || gmail==="" || password===""){
            return res.status(400).json({success:false,message:"please fill all the details of the form"});
        }
        const uniqueGmail=await users.findAll({where:{gmail:gmail}});
        if (uniqueGmail.length!==0){
            return res.status(500).json({success:false,message:"User already exist,Please enter different user id"});
        }
        const saltRounds=10;
        bcrypt.hash(password,saltRounds, async(err,EcyPass)=>{
            console.log(err);

            const data=await users.create({
                name:name,
                gmail:gmail,
                password:EcyPass,
            });
            
        })
        

       return res.status(200).json({success:true,message:'Signup successfull'});

    }catch(err){
        console.log(err);
       return res.json({success:false,message:'user already existed..'});
    }
}

exports.login=async(req,res)=>{
    try{
        //console.log(req.body)
        const gmail=req.body.gmail;
        const password=req.body.password;

        if(gmail.length==='' || password.length===''){
            return res.status(400).json({success:false,message:'Gmail or Password is missing'});
        }
        const uniqueGmail=await users.findAll({where:{gmail:gmail}});
        //console.log("Unique",uniqueGmail[0].gmail)
        if(uniqueGmail.length!==0){
            bcrypt.compare(password,uniqueGmail[0].password, (err,result)=>{
                if (err){
                    throw new error ('Something went wrong')
                }
                if (result === true){
                    const id=generateToken(uniqueGmail[0].id);
                    return res.status(200).json({success:true,message:'User logged in successfully',token:id});
                    
                }else{
                    return res.status(400).json({success:false,message:'Password is incorrect '});
                }
            })
        }else{
            return res.status(400).json({success:false,message:'User does not existed'})
        }

    }catch(err){
        console.log(err)
    }
}

function generateToken(id){
    return jwt.sign({UserId:id},'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9');
}

exports.expenseTracker_html=(req,res)=>{
    res.sendFile(process.cwd()+'/expenseTracker.html');
}

exports.addExpense=async(req,res)=>{
    const t=await db.transaction();
    try{
        const cost=req.body.cost;
        const description=req.body.description;
        const category=req.body.category;

        await expense_table.create({
            cost:cost,
            description:description,
            category:category,
            UserId:req.user.id,
        },
        {transaction:t})
        const ur=await users.findOne({where:{id:req.user.id}})
        const old_total=ur.total_expense
        const new_total=Number(old_total)+Number(cost)
        //console.log(new_total)
        users.update({total_expense:new_total,transaction:t},{where:{id:req.user.id}})
        await t.commit();
    }catch(err){
        await t.rollback();
        return res.status(500).json({err:err});
    }
}

exports.get_expenses=async(req,res,next)=>{
    try{
    const expense= await expense_table.findAll({where: {UserId:req.user.id}})
    const prime=await users.findOne({where:{id:req.user.id}})
    return res.json({exp:expense,prime:prime.isPrimeUser});
    }catch(err){
        console.log(err);
    }
}

exports.delete_expense=async(req,res,next)=>{
    try{
    const del_id=req.params.id;
    //console.log('del Id',del_id)
    const del_exp=await expense_table.findOne({where:{id:del_id}})
    const data=await expense_table.destroy({where:{id:del_id, UserId:req.user.id}})

    const ur=await users.findOne({where:{id:req.user.id}})
    const old_total=ur.total_expense
    
    const new_total=Number(old_total)-Number(del_exp.cost)
    //console.log(new_total)
    req.user.update({total_expense:new_total})

    }catch(err){
        console.log(err);
    }
}

