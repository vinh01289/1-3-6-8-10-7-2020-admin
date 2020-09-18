const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tokenSchema = new Schema({
    id_user:{
        type: mongoose.Schema.Types.ObjectId
    },
    token : {
        type: String,
        unique: true,
        required: true
    },
    state : {
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
    }
});

module.exports = mongoose.model('token', tokenSchema);