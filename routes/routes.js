const express=require('express');

const bodyParser=require('body-parser');

const route=express.Router();

const controller=require('../controller/controller');
const userAuthentication=require('../middleware/auth')

route.post('/signup',bodyParser.json(),controller.signup);

route.get('/',controller.home);

route.get('/signup.html',controller.signup_html);

route.get('/login.html',controller.login_html);

route.post('/login',bodyParser.json(),controller.login);

route.get('/expenseTracker.html',controller.expenseTracker_html);

route.post('/add_expense',bodyParser.json(),userAuthentication.authenticate,controller.addExpense);

route.get('/get_expenses',bodyParser.json(),userAuthentication.authenticate,controller.get_expenses);

route.delete('/delete_expense/:id',bodyParser.json(),userAuthentication.authenticate,controller.delete_expense);

module.exports=route;