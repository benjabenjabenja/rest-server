const { Schema, model } = require('mongoose');

const user_schema = new Schema({
    username: {
        type: String,
        required: [true, 'field <username> is required']
    },
    password: {
        type: String,
        required: [true, 'field <password> is required']
    },
    email: {
        type: String,
        required: [true, 'field <email> is required'],
        unique: true
    },
    image: { type: String },
    role: {
        type: String,
        required: [true, 'field <role> is required'],
        enum: ['ROLE_ADMIN', 'ROLE_USER']
    },
    active: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }

});

//const Model = model('User', user_schema);
module.exports =  model('User', user_schema);// Model.createCollection();