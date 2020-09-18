const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded( {extended:true} ));

app.set('view engine', 'ejs');

// cấu hình đường dẫn file css, js, image, ...
app.use(express.static(path.join(__dirname, '/public/admin/')));

// connect database
require('./dbconnect');

// load index_router
const index_router = require('./controllers/index_router');
app.use('/', index_router);

app.listen(3000, ()=>{ console.log('Đã kết nối') });