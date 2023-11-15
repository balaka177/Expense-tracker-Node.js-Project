const express=require('express');
const cors=require('cors');
const bodyParser=require('body-parser');
const db=require('./util/database');
const users=require('./model/users');
const expenses=require('./model/expenses');
const route=require('./routes/routes');
const controller=require('./controller/controller');
const orders=require('./model/order');
require('dotenv').config();

const app=express();

app.use(cors());
app.use(route);

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

users.hasMany(expenses);
expenses.belongsTo(users);

orders.belongsTo(users);
users.hasMany(orders);

db.sync();
app.listen(8080);