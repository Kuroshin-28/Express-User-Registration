const authRouter = require('express').Router();
const Auth = require('../models/user');

authRouter.post('/checkCredentials', (req, res) => {
    const { email, password } = req.body;
    Auth.findByEmail(email).then((user) => {
        if (!Auth.verifyPassword(password, user.hashedPassword)) {
            return Promise.reject('INVALID_PASSWORD');
        }
        res.status(200).json({
            "firstname" : user.firstname,
            "lastname" : user.lastname,
            "city" : user.city,
            "language" : user.language,
            "email" : user.email
        });
    }).catch((err) => {
        console.error(err);
        if (err === 'INVALID_PASSWORD') {
            res.status(401).json({ message: 'Wrong password or email' });
        } else {
            res.status(500).send('Cant reach the server for authentification');
        }
    });
});

module.exports = authRouter;