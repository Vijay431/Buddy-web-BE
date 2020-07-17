import express, {Request, Response, NextFunction} from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';

import environment from './config/environment';

// import { OTPGenerator } from './config/otpGenerator';
import { AuthRoute } from './components/router/auth.route';

class App{
    public app: express.Application;
    // public otp: OTPGenerator = new OTPGenerator();
    public auth: AuthRoute = new AuthRoute();

    constructor(){
        this.app = express();
        this.dbConnection();
        this.config();
        // this.otp;
        this.auth.routes(this.app);
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

    config(){
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: false}));
        this.app.use(cors());
    }

}

export default new App().app;