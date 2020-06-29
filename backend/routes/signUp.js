const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').post((req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const dob = Date.parse(req.body.dob);

    User.find({
        email: email
    }, (err, previousUsers) => {
        if (err) {
            return res.send({
                success: false,
                message: 'Error: Server error'
            });
        } else if (previousUsers.length > 0) {
            return res.send({
                success: false,
                message: 'Error: Email already exists'
            });
        }

        const newUser = new User({ name, dob, email, password });
        newUser.password = newUser.generateHash(password);
        newUser.save()
            .then(() => {
                return res.send({
                    success: true,
                    message: 'User added successfully'
                });
            });
    });
})

module.exports = router;
