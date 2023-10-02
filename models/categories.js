const { Schema, model } = require('mongoose');

const categories_schema = new Schema({
    name: {
        type: String,
        required: [true, 'field <name> is required'],
    },
    tag: {
        type: String,
        required:[ true,'field <tag> is required']
    }
});

categories_schema.methods.toJSON = function () {
    const { __v, _id, ...category } = this.toObject();
    return { ...category, _uid: _id };
};

module.exports = model('Categories', categories_schema);