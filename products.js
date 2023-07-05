const Sequelize=require('sequelize');

const db=require('../util/database');

const Product=db.define('New_users',{
    name:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    gmail:{
        type:Sequelize.STRING,
        allowNull:false,
        primaryKey:true,
    },
    password:{
        type:Sequelize.STRING,
        allowNull:false,
    }

});

module.exports=Product;