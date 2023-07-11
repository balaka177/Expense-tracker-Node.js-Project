const Sequelize=require('sequelize');

const db=require('../util/database');

const expense_table=db.define('Expense_table',{
    cost:{
        type:Sequelize.INTEGER,
        allowNull:false,
    },
    description:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    categeory:{
        type:Sequelize.STRING,
        allowNull:false,
    },
});

module.exports=expense_table;