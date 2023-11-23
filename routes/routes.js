const express=require('express');

const bodyParser=require('body-parser');

const route=express.Router();

const controller=require('../controller/controller');

const premium=require('../controller/premium');

const userAuthentication=require('../middleware/auth')

const send_in_blue=require('../controller/send_in_blue')

route.post('/signup',bodyParser.json(),controller.signup);

route.get('/',controller.home);

route.post('/login',bodyParser.json(),controller.login);

route.post('/add_expense',bodyParser.json(),userAuthentication.authenticate,controller.addExpense);

route.get('/get_expenses',bodyParser.json(),userAuthentication.authenticate,controller.get_expenses);

route.delete('/delete_expense/:id',bodyParser.json(),userAuthentication.authenticate,controller.delete_expense);

route.get('/purchase_premium',bodyParser.json(),userAuthentication.authenticate,premium.purchage_premium);

route.post("/update_purchase",bodyParser.json(),userAuthentication.authenticate,premium.update_purchase);

route.get('/leaderboard',bodyParser.json(),premium.leader_board);

route.post('/forgot_password',bodyParser.json(),controller.forgot_password);

route.post('/send_in_blue',bodyParser.json(),send_in_blue.send_mail);

module.exports=route;