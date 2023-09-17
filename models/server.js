const express = require('express');
const { log } = require('../helpers/log');
const cors = require('cors');
const { connection_mongodb } = require('../database/config');
const { ROOT_PATH_API } = process?.env;

class Server {
    
    constructor() {
        // create server express
        this.app = express();
        // add port to listen
        this.port = process?.env.PORT || 3001;
        // declare routes
        this.elements_routes_path = `${ROOT_PATH_API}/elements`;
        this.user_routes_path = `${ROOT_PATH_API}/user`;
        // conneccion db
        this._db_connect();
        // middelwares
        this.middelwares();
        // routes of app
        this.routes();
    }

    middelwares = () => {
        // CORS
        this.app.use(cors());
        // lectura y parseo del body
        this.app.use(express.json());
        // public directory
        this.app.use(express.static('public'));
    }

    routes = () => {
        this.app.use(`${this.elements_routes_path}`, require('../routes/elements.routes'))       
        this.app.use(`${this.user_routes_path}`, require('../routes/user.routes'))       
        this.app.get('*', (req, res) => { res.status(404).send('404 | Not Found') });
    }

    start_server = () => this.app.listen(this.port, () => log(`App running in PORT :: ${this.port}`));
    _db_connect = async () => await connection_mongodb(); 
}
module.exports = Server;