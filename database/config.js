const mongoose = require('mongoose');
const { log } = require('../helpers/log');
const { MONGODB_CNN } = process.env;


/**
 * Connects to a MongoDB database using the MONGODB_CNN connection
 * string and logs a success message if the connection is successful, otherwise it logs an error and
 * throws an exception.
 */
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