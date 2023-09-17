const mongoose = require('mongoose');
const { log } = require('../helpers/log');
const { MONGODB_CNN } = process.env;


const connection_mongodb = async () => {
    try {
        await mongoose.connect(MONGODB_CNN);
        log('db connected');
    } catch (e) {
        log(e);
        throw new Error('Connection error');
    }
}

module.exports = {
    connection_mongodb
}