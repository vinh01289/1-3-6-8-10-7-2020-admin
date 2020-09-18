const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://vinh:hanhphucao@cluster0-covao.mongodb.net/project1?retryWrites=true&w=majority',{
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then( ()=>{ console.log('Đã kết nối database') } )
.catch( (err)=> { console.log(err.message) } );