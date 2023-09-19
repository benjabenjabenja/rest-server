const { Schema, model } = require('mongoose');
const role_schema = new Schema({
    rol: {
        type: String,
        required: [true, 'rol field is required']
    }
});

module.exports = model('Role', role_schema);