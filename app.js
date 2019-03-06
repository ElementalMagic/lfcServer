var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var compression = require('compression');
var mongoose = require('mongoose');
var orderRouter = require('./routes/order');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var reviewRouter = require('./routes/review');
var multer = require('multer');
var keys = require('./config/keys.js');
var app = express();

mongoose
    .connect(keys.mongoURI)
    .then(() => console.log("MongoDB connected."))
    .catch(error => console.log(error));

app.use(compression());
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('*', function (req,res,next) {
    if(req.hostname === 'fabrikabloknotov.ru' || !process.env.CHECKDOMAIN){
        next();
    } else {
        res.status(301).redirect('https://fabrikabloknotov.ru');
    }
});


app.get('/login', (req,res) => {
    res.status(200).sendFile(path.resolve('../../client/fb/login.html'))
});
app.get('/editPage', function (req,res) {
    console.log(req.query);

    if(req.query.key === keys.secretKey){
        res.status(200).sendFile(path.resolve('../../client/fb/admin.html'));
    } else {
        res.redirect('/login');
    }
});

app.get('*', function (req,res,next) {
    if(req.path.endsWith('.html')){
        res.sendFile(path.resolve('../../client/fb/NotFound.html'))
    } else {
        next();
    }
});

app.use(express.static(path.resolve('../../client/fb')));
app.use("/images", express.static("images"));

app.use('/api/order', orderRouter);
app.use('/api/login', loginRouter);
app.use('/api/review', reviewRouter);

app.use('*', (req,res) => res.status(200).sendFile(path.resolve('../../client/fb/index.html')));
module.exports = app;
