const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Gọi model
const userModel = require('../models/user_model');
const tokenModel = require('../models/token_model');
//const { response } = require('express');

router.post('/register', (req, res)=>{

    const saltRounds = 10;
    const myPlaintextPassword = req.body.password;

    // Kiểm tra username có tồn tại hay không
    userModel.find({username: req.body.username}).exec(function(err, data){
        if(err){
            res.json({kq:0, err: err});
        }else{
            if(data.length==0){
                //Mã hóa mật khẩu
                bcrypt.genSalt(saltRounds, function(err, salt) {
                    bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
                        // Store hash in your password DB.
                        if(err){
                            res.json({kq:0, err: err});
                        }else{
                            var obj = {
                                'name' : req.body.name,
                                'username' : req.body.username,
                                'password' : hash
                            }
                            //Thêm tài khoản
                            userModel.create(obj, function(err, data){
                                if(err){
                                    res.json({kq:0, err: err});
                                }else{
                                    res.json({kq: 1, data: data});
                                    // Gửi mail
                                    // 3 điều kiện:
                                    // 1. Tải thư viện nodemailler
                                    // 2. Tài khoản gửi mail phải đảm bảo 2 yếu tố:
                                    //  2.1 Bật POP/IMAP
                                    //  2.2 Tắt bảo mật gửi mail bên thứ 3
                                }
                            });
                        }
                    });
                });
            }else{
                res.json({kq: 0, data: 'User existed'});
            }
        }
    });
});

// active
router.get('/active/:username', (req, res)=>{
    res.send( req.params.username );
});

// login
router.post('/login', (req, res)=>{
    //res.send('hello');

    //res.send( req.body.username + '/' + req.body.password );

    // kiểm tra username
    userModel.find({username: req.body.username}).exec(function(err, data){
        if(err){
            res.json({kq:0, err: 'Username '+ err});
        }else{
            if(data.length==0){
                res.json({kq: 0, data: 'User is not existed'});
            }else{
                //res.send('ok');
                bcrypt.compare(req.body.password, data[0].password, function(err, result) {
                    if(err){
                        res.json({kq:0, err: 'Password '+ err});
                    }else{
                        if(result == true){
                            //res.send('ok');

                            var str_token = {
                                name : data[0].name,
                                username : data[0].username,
                                device : req.headers['user-agent']
                            };

                            var privateKey = '$#@123^&';

                            // Tạo token
                            jwt.sign(str_token, privateKey, { expiresIn: 30 }, function(err, token) {
                                //console.log(token);
                                if(err){
                                    res.json({kq:0, err: 'Token '+ err});
                                }else{
                                    //res.send(token);
                                    // thêm dữ liệu vào database bảng token
                                    var data_token = {
                                        id_user: data[0]._id,
                                        token: token
                                    }

                                    tokenModel.create(data_token, function(err, data_tk){
                                        if(err){
                                            res.json({kq:0, err: 'Table token '+ err});
                                        }else{
                                            res.json({kq:1, mess: data_tk});
                                        }
                                    });
                                }
                            });

                        }else{
                            res.json({kq: 0, data: 'Password is not corrected'});
                        }
                    }
                });

            }
        }
    });

});

// logout 1 thiết bị
router.post('/logout_one', (req, res)=>{
    tokenModel.findOneAndUpdate({token: req.body.token}, {state: false}, { new: true }, function(err, data){
        if(err){
            res.json({kq:0, err: err});
        }else{
            res.json({kq:1, data: data});
        }
    });
});

// logout nhiều thiết bị
router.post('/logout_all', (req, res)=>{
    tokenModel.updateMany({id_user: req.body.id_user, state:true}, {state: false}, function(err, data){
        if(err){
            res.json({kq:0, err: err});
        }else{
            res.json({kq:1, data: data});
        }
    });
});

module.exports = router;