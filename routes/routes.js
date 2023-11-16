const express=require('express');

const bodyParser=require('body-parser');

const route=express.Router();

const controller=require('../controller/controller');

const premium=require('../controller/premium');

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

route.get('/purchase_premium',bodyParser.json(),userAuthentication.authenticate,premium.purchage_premium);

route.post("/update_purchase",bodyParser.json(),userAuthentication.authenticate,premium.update_purchase);

route.get('/leaderboard',bodyParser.json(),premium.leader_board);

//route.post('/total_exp',bodyParser.json(),premium.total_exp);

module.exports=route;
