const SignInRequest = require("../../../modules/auth/application/SignInRequest");

class AuhtController {
    constructor(authService) {
        this.authService = authService;
    }

    signin = async (req, res) => {

        const { email, password } = req.body;
        const signInReponse = await this.authService.authenticate({ email, password });
        return res.json({
            message: 'User logged in successfully',
            data: signInReponse
        })
    }

    signup = async (req, res, next) => {
        const { name, email, password } = req.body;
        const signUpReponse = await this.authService.register({ name, email, password });

        return res.json({
            message: 'User logged up successfully',
            data: signUpReponse
        })
    }
}


module.exports = AuhtController;