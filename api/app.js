var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();


var userRouter = require('./routes/user');
var dashboardRouter = require('./routes/dashboard');
var companyRouter = require('./routes/company');
var roleRouter = require('./routes/role');
var relations = require('./routes/relation');
var task = require('./routes/task');

var app = express();
app.use(cors());

app.use('/public', express.static(path.join(__dirname, 'uploads')));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/user', userRouter);
app.use('/dashboard', dashboardRouter);
app.use('/company', companyRouter);
app.use('/role', roleRouter);
app.use('/relations', relations);
app.use('/task', task);


  
module.exports = app;