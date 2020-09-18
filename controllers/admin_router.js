const express = require('express');
const router = express.Router();

router.get('/index', (req, res)=>{
    var link = req.originalUrl;
    var tachchuoi = link.split('/');

    var main = 'partials/main';
    res.render('index', { main : main, link : tachchuoi[1] } );
});

module.exports = router;