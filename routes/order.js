var express = require('express');
var router = express.Router();
var path = require('path');
var nodemailer = require('nodemailer');

/* GET home page. */
router.post('/:type', function (req, res, next) {
    const contactEmail = req.body.email;
    console.log(req.body);
    switch (req.params.type) {
        case '1':{
            sendEmail(req.body, res);
            break;
        }
        case 'phone':{
            sendEmailPhone(req.body, res);
        }
    }
});

function sendEmail(req1, res){
    var transporter = nodemailer.createTransport({
        host: "smtp.yandex.ru",
        port: 465,
        secure: true,
        auth: {
            user:'iqlex1',
            pass: process.env.PASS
        }
    });
   let html = req1.body.html;

    var mailOptions = {
        from: '"Банк" <iqlex1@yandex.ru>',
        to: 'info@fabrikabloknotov.ru',
        subject: 'Заказ расчета с сайта ФабрикаБлокнотов',
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
function sendEmailPhone(req1, res){
    var transporter = nodemailer.createTransport({
        host: "smtp.yandex.ru",
        port: 465,
        secure: true,
        auth: {
            user:'iqlex1',
            pass: process.env.PASS
        }
    });

    let html = req1.body.html;

    var mailOptions = {
        from: '"Банк" <iqlex1@yandex.ru>',
        to: 'info@fabrikabloknotov.ru',
        subject: 'Заказ звонка с сайта ФабрикаБлокнотов',
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
