const { Schema, model } = require('mongoose');

const login_schema = new Schema({
    username: {
        type: String,
        required: [true, 'field <email> is required']
    },
    password: {
        type: String,
        required: [true, 'field <password> is required']
    }
})

login_schema.methods.toJSON = function () {
    const { password, __v,...user_loged } = this.toObject();
    return user_loged;
}

module.exports = model('Login', login_schema);