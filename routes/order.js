var express = require('express');
var router = express.Router();
var path = require('path');
var nodemailer = require('nodemailer');
var config = require('../config/keys');

/* GET home page. */
router.post('/:type', function (req, res, next) {
    const contactEmail = req.body.email;
    switch (req.params.type) {
        case 'program':{
            sendEmail(req, res);
            break;
        }
        case 'phone':{
            sendEmailPhone(req, res);
        }
    }
});

function sendEmail(req, res){
    var transporter = nodemailer.createTransport({
        host: "smtp.yandex.ru",
        port: 465,
        secure: true,
        auth: {
            user: config.emailLogin,
            pass: process.env.PASS
        }
    });
   let html = req.body.html;

    var mailOptions = {
        from: '"Банк" <iqlex1@yandex.ru>',
        to: config.emailReceiver,
        subject: 'Обращение с сайта Ленинградский Финансовый центр',
        html: html
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.status(400).json(error);
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).json('Email sent');
        }
    });
}
function sendEmailPhone(req, res){
    var transporter = nodemailer.createTransport({
        host: "smtp.yandex.ru",
        port: 465,
        secure: true,
        auth: {
            user: config.emailLogin,
            pass: process.env.PASS
        }
    });

    let html = req.body.html;

    var mailOptions = {
        from: '"Банк" <iqlex1@yandex.ru>',
        to: config.emailReceiver,
        subject: 'Обращение с сайта Ленинградский Финансовый центр',
        html: html + '<div><h3>Заказ</h3> <h4> <span><b>Пользователь просит перезвонить ему.</b></span> ' +
            '</h4></div><br><br><br><br><br><div><h4><span><i>Это письмо было создано автоматически.</i>' +
            '</span> <span><i>Не нужно отвечать на него.</i></span></h4></div>'
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.status(400).json(error);
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).json('Email sent');
        }
    });
}

module.exports = router;
