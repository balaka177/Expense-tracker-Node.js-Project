const express=require('express');

const app=express();

const bodyParser=require('body-parser');

const routes=require('./routes');

const db=require('../util/database');

app.use(express.urlencoded({extended:false}));
//app.use(bodyParser.json());

app.use(routes);

db.sync();

app.listen(8080);