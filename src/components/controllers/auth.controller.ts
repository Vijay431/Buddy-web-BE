import {Request, Response, NextFunction} from 'express';
import nodemailer from 'nodemailer';
import mongoose from 'mongoose';

import { AuthSchema } from '../models/auth.model';

const Auth = mongoose.model('users', AuthSchema)

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

    //Send OTP
    public sendOTP(req: Request, res: Response, next: NextFunction){
        const { phone, otp } = req.body;
        Auth.find({phone: phone})
        .then((users:any) => {
            if(users.length != 0){
                let email = users[0].email; 
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
                    text: `The generated OTP is ${otp}!`
                };
                transporter.sendMail(mailOptions, function(error, info){
                    if (error) {throw error}
                    res.status(200).json({message: 'success', info: info})
                    }
                );
            }
            else{
                res.status(200).json({message: 'failure'});
            }
        })
        .catch((err:any) => {
            res.status(500).json({error: 'Uh-Oh! Something went Wrong!'});
        })
    }

    public validateOTP(req: Request, res: Response, next: NextFunction){}

    public register(req: Request, res: Response, next: NextFunction){}
}