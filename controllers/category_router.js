const express = require('express');
const router = express.Router();

const categoryModel = require('../models/category_model');

router.get('/index', (req, res)=>{
    var link = req.originalUrl;
    var tachchuoi = link.split('/');

    // var data = [
    //         {
    //             name: 'Môn Toán'
    //         },
    //         {
    //             name: 'Môn Lý'
    //         },
    //         {
    //             name: 'Môn Hóa'
    //         },
    //         {
    //             name: 'Môn Sinh'
    //         }
    // ]

    // categoryModel.insertMany(data);

    var main = 'categorys/main';
    res.render('index', { main : main, link : tachchuoi[1] } );
});

module.exports = router;