import {Request, Response, NextFunction} from 'express';
import nodemailer from 'nodemailer';
import mongoose from 'mongoose';

import environment from '../../config/environment';
import { AuthSchema } from '../models/auth.model';

const Auth = mongoose.model('users', AuthSchema);

export class AuthController{

    //Login Controller
    public login(req: Request, res: Response, next: NextFunction){
        Auth.find(req.query)
        .then((users:any) => {
            if(users.length != 0) return res.status(200).json({message: 'success'});
            res.status(401).json({message: 'failure'});
        })
        .catch((err:any) => {
            res.status(500).json({error: 'Uh-Oh! Something went Wrong!'});
        })
    }

    //OTP Generator
    public otpGenerator(){
        let pattern = environment.PATTERN;
        let digits = environment.DIGITS;
        let otp = "";

        for(let i=0; i<Number(digits); i++){
            otp += pattern[Math.floor(Math.random() * 10)];
        }
        console.log(">>>>" + otp);
        return otp;
    }

    //Send OTP
    public sendOTP(req: Request, res: Response, next: NextFunction){
        let email = req.body.email;
        let otp = '123456';
        console.log(this.otpGenerator());
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'venusarjun270@gmail.com',
                pass: 'menaka147**'
            }
        });
        let mailOptions = {
            from: 'buddywebchat@gmail.com',
            to: email,
            subject: 'OTP Generated',
            text: `This is an AUTO-GENERATED mail. Don't reply to this mail. The generated OTP is ${otp}`
        };
        transporter.sendMail(mailOptions)
        .then((info:any) => {
            return res.status(200).json({message: 'success'});
        })
        .catch((err:any) => {
            return res.status(400).json({error: 'Mail service is temporarily unavailable'});
        })
    }

    public validateOTP(req: Request, res: Response, next: NextFunction){

    }

    public register(req: Request, res: Response, next: NextFunction){}
}