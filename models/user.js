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
        enum: ['ADMIN_ROLE', 'USER_ROLE']
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

user_schema.methods.toJSON = function () {
    const { password, __v, _id,...user } = this.toObject();
    return { ...user, _uid: _id };
}

module.exports = model('User', user_schema);