const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name : {
        type: String,
        unique: true,
        required: true
    },
    content: {
        type: String
    },
    image: {
        type: String
    },
    status: {
        type: Boolean,
        default: 1,
    },
    date_created: {
        type: Date,
        default: Date.now()
    },
    date_updated: {
        type: Date,
        default: Date.now()
    },
    id_cha:{
        type: mongoose.Schema.Types.ObjectId
    },
    id_user:{
        type: mongoose.Schema.Types.ObjectId
    }
});

module.exports = mongoose.model('categorys', categorySchema);