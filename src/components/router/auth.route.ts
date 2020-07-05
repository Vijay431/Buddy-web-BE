import { AuthController } from '../controllers/auth.controller';

export class AuthRoute{
    public authController:AuthController = new AuthController();

    public routes(app:any): void{
        app.route('/auth/login')
        .get(this.authController.login)

        app.route('/auth/sendOTP')
        .post(this.authController.sendOTP)

        app.route('/auth/validateOTP')
        .get(this.authController.validateOTP)

        app.route('/auth/register')
        .post(this.authController.register)
    }
}