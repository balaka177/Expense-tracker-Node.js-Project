const Sequelize=require('sequelize');

const sequelize=new Sequelize('node-complete','root','ASDF12345@a',{
    dialect:'mysql',
    host:'localhost'
});
module.exports=sequelize;