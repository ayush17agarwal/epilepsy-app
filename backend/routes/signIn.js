const router = require('express').Router();
let UserSession = require('../models/userSession.model');
let User = require('../models/user.model');


router.route('/verify').get((req, res) => {
    const { query } = req;
    const { token } = query;

    UserSession.find({
        _id: token,
        isDeleted: false
    }, (err, sessions) => {
        if (err) {
            return res.send({
                success: false,
                message: 'Error: internal server error'
            });
        }
        if (sessions.length !== 1) {
            return res.send({
                success: false,
                message: 'Error: Wrong token id'
            });
        } else {
            return res.send({
                success: true,
                message: 'Good token'
            });
        }
    });
});

router.route('/').post((req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    User.find({
        email: email
    }, (err, users) => {
        if (err) {
            return res.send({
                success: false,
                message: 'Error: server error'
            });
        }
        if (users.length !== 1) {
            return res.send({
                success: false,
                message: 'Error: Invalid username'
            });
        }

        const user = users[0];
        if (!user.validatePassword(password)) {
            return res.send({
                success: false,
                message: 'Error: Invalid password'
            });
        }

        const userSession = new UserSession();
        userSession.userId = user._id;
        userSession.save()
            .then((doc) => {
                return res.send({
                    success: true,
                    message: "Session created!",
                    token: doc._id
                });
            })
            .catch((err) => res.status(400).json("Error: " + err));
    });
});

module.exports = router;
