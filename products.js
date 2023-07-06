const Sequelize=require('sequelize');

const dbase=require('../util/database');

const Product=dbase.define('New_users',{
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