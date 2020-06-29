const router = require('express').Router();
let UserSession = require('../models/userSession.model');

router.route('/account').get((req, res) => {
    const { query } = req;
    const { token } = query;

    UserSession.findOneAndUpdate({
        _id: token,
        isDeleted: false
    }, {
        $set: { isDeleted: true }
    }, null,
        (err, sessions) => {
            if (err) {
                return res.send({
                    success: false,
                    message: 'Error: internal server error'
                });
            }
            return res.send({
                success: true,
                message: 'Logout Successful'
            });
        });
});

module.exports = router;