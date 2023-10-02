const { Schema, model } = require('mongoose');

const category_schema = new Schema({
    name: {
        type: String,
        required: [true, 'field <name> is required'],
    },
    tag: {
        type: String,
        required:[ true,'field <tag> is required']
    },
    active: {
        type: Boolean,
        default: true
    }
});

category_schema.methods.toJSON = function () {
    const { __v, _id, ...category } = this.toObject();
    return { ...category, _uid: _id };
};

module.exports = model('Categories', category_schema);