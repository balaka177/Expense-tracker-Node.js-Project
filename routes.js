const express=require('express');

const route=express.Router();

const controller=require('./controller');


route.get('/',controller.home);

route.post('/add_data',controller.add_data);

route.post('/login',controller.login);

route.get('/redirect',controller.redirect);

module.exports=route;