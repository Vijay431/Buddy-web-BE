import express, {Request, Response, NextFunction} from "express";
import mongoose from "mongoose";

import environment from "./config/environment";

class App{
    public app: express.Application;

    constructor(){
        this.app = express();
        this.dbConnection();
    }

    dbConnection(){
        mongoose.Promise = global.Promise;
        mongoose.connect(environment.DB_URL, {useUnifiedTopology: true, useNewUrlParser: true})
        .then((res:any) => {
            console.log('DB Connected Successfully!');
        })
        .catch((err:any) => {
            throw err
        })
    }

}

export default new App().app;