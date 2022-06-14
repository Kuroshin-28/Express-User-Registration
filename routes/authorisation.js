const authRouter = require('express').Router();
const Auth = require('../models/user');

authRouter.post('/checkCredentials', (req, res) => {
    const { email, password } = req.body;
    Auth.findByEmail(email).then((user) => {
        if (!user) {
            console.log("User Authentification : Failure");
            res.status(401).send('Wrong email or password');
        } else {
            Auth.verifyPassword(password, user.hashedPassword).then((accessGranted) => {
                if (!accessGranted) {
                    console.log("User Authentification : Failure");
                    res.status(401).send('Wrong email or password');
                } else {
                    console.log("User Authentification : Success");
                    res.status(200).json({
                        "firstname" : user.firstname,
                        "lastname" : user.lastname,
                        "city" : user.city,
                        "language" : user.language,
                        "email" : user.email
                    });
                }
            })
        }
    })
});

module.exports = authRouter;