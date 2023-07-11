const express=require('express');

const route=express.Router();

const controller=require('./controller');


route.get('/',controller.home);

route.post('/add_data',controller.add_data);

route.post('/login',controller.login);

route.get('/redirect',controller.redirect);

route.post('/add_expense',controller.add_expense);

route.get('/show_expenses',controller.show_expenses);

route.delete('/delete/:id',controller.delete_user)

module.exports=route;