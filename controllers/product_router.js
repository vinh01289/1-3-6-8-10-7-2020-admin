const express = require('express');
const router = express.Router();

const cookie = require('cookie-parser');
router.use( cookie() );

const productModel = require('../models/product_model');
const userModel = require('../models/user_model');

// Lấy model category
const categoryModel = require('../models/category_model');

router.get('/index(/:pageindex/:pagesize)?', async (req, res)=>{
    
    userModel
    .find( {username: req.cookies.name} )
    .exec( async function(err, kq){

        if(err) throw err;

        if(kq[0].role == 2)
        {
            var link = req.originalUrl;
            var tachchuoi = link.split('/');

            var s = req.query.s;

            var page = req.params.pageindex;
            var limit = 3;//req.params.pagesize

            var start;

            if(page==undefined || page==1){
                start=0;
                xetActive=1;
            }else{
                start=(page-1)*limit;
                xetActive=page;
            }

            // Tổng số sản phẩm
            let sumProduct = await productModel.find();
            // Tổng số trang
            let sumPage = Math.ceil( sumProduct.length / limit );

            // Về đầu trang
            var str='<li class="page-item">';
            str += '<a class="page-link" href="#">';
            str += '<i class="fa fa-angle-double-left"></i></a></li>';
            
            // lùi 1 trang
            str +='<li class="page-item">';
            str += '<a class="page-link" href="#">';
            str += '<i class="fa fa-angle-left"></i></a></li>';

            for(let i=1; i<=sumPage; i++ ){

                var active='';

                // xét active
                if(xetActive==i)
                {
                    active='active';
                }

                str += '<li class="page-item '+active+'">';
                str += '<a class="page-link" href="product/index/'+i+'/'+limit+'">'+i+'</a></li>';
            }

            // Tiến 1 trang
            str +='<li class="page-item">';
            str += '<a class="page-link" href="#">';
            str += '<i class="fa fa-angle-right"></i></a></li>';

            // Về cuối trang
            str +='<li class="page-item">';
            str += '<a class="page-link" href="#">';
            str += '<i class="fa fa-angle-double-right"></i></a></li>';

            //console.log(sumPage);

            var main = 'products/main';

            // thông tin bảng sản phẩm
            productModel.
            find({ $or: [ {name:{$regex:'.*'+s+'.*'}}, {content: {$regex:'.*'+s+'.*'}} ] } ).
            sort({'_id': -1}).
            limit(limit).
            skip(start).
            exec(function(err, data){
                if(err) throw err;

                // data.forEach(function(e){
                //     console.log(e.id_category);
                // });

                // Lấy ra id_category
                // => lấy ra name category
                // Thêm vào object data rồi gửi qua views

                res.render('index', { main : main, link : tachchuoi[1], data:data, url:'', str:str } );
            });
        }
        else
        {
            console.log('Bạn không đủ quyền');
        }

    });
});

router.get('/add', (req, res)=>{
    var link = req.originalUrl;
    var tachchuoi = link.split('/');

    // Lấy danh mục sản phẩm
    categoryModel.find().exec(function(err, data){
        if(err) throw err;

        var main = 'products/add';
        res.render('index', {main:main, link:tachchuoi[1], url:'add', category:data } );
    });
});

router.post('/process_add', (req, res)=>{
    var arr = {
        'name' : req.body.name,
        'content' : req.body.content,
        'id_category' : req.body.id_category
    }

    productModel.create(arr, function(err, data){
        if(err) res.json({kq: 0, errMsg: "Dữ liệu đã bị trùng"});

        res.json({kq: 1});
    });

});

router.get('/edit/:id', (req, res)=>{
    var link = req.originalUrl;
    var tachchuoi = link.split('/');

    var main = 'products/edit';

    productModel.
    findById(req.params.id).
    exec(function(err, data){
        if(err) throw err;

        res.render('index', { main : main, link : tachchuoi[1], data:data, url:'edit/'+req.params.id} );
    });
});

router.post('/process_edit/:id', (req, res)=>{

    var arr = {
        'name' : req.body.name,
        'content' : req.body.content
    };

    productModel.updateMany({_id: req.params.id}, arr, function(err, data){
        if(err) res.json({kq: 0, errMsg: "Dữ liệu đã bị trùng"});

        res.json({kq: 2});
    });

});

router.post('/delete', (req, res)=>{

    productModel.findByIdAndDelete(req.body.id, function(err, data){
        if(err) res.json({kq: 0});

        res.json({kq: 1});
    })

});

module.exports = router;