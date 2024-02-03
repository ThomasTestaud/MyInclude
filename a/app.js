var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();


var userRouter = require('./routes/user');
var dashboardRouter = require('./routes/dashboard');

var app = express();
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/user', userRouter);
app.use('/dashboard', dashboardRouter);

  
module.exports = app;