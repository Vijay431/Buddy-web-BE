import environment from './environment';

export class OTPGenerator{

    public otpGenerator(){
        let pattern = environment.PATTERN;
        let digits = environment.DIGITS;
        let otp = "";

        for(let i=0; i<Number(digits); i++){
            otp += pattern[Math.floor(Math.random() * 10)];
        }

        console.log(otp);
        environment.OTP = otp;
        return otp;
    }


}
