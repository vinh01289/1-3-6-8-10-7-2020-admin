const express = require('express');
const router = express.Router();

const cookie = require('cookie-parser');
router.use( cookie() );

const userModel = require('../models/user_model');

router.get('/index', (req, res)=>{
    var link = req.originalUrl;
    var tachchuoi = link.split('/');

    // khởi tạo
    res.cookie('name', 'nguyenvana', {maxAge: 10000} ).end('Đã tạo cookie');

    // var data = [
    //         {
    //             name: 'Nguyễn Văn A',
    //             username: 'nguyenvana',
    //             password: '123456'
    //         },
    //         {
    //             name: 'Nguyễn Văn B',
    //             username: 'nguyenvanb',
    //             password: '123456',
    //             role: '2'
    //         }
    // ]

    // userModel.insertMany(data);

    //var main = 'users/main';
    //res.render('index', { main : main, link : tachchuoi[1] } );
});

module.exports = router;