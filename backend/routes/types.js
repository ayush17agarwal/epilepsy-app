const router = require('express').Router();
let Type = require('../models/type.model');
let UserSession = require('../models/userSession.model');
let User = require('../models/user.model');
var ObjectId = require('mongodb').ObjectID;


router.route('/add').post((req, res) => {
    const token = req.body.token;
    const name = req.body.name;
    const description = req.body.description;

    const type = new Type({name, description});
    //type.save();
    UserSession.find({
        _id: token,
        isDeleted: false
    }, (err, sessions) => {
        const session = sessions[0];
        User.findById(session.userId)
            .then(user => {
                user.types.push(type);
                user.save()
                    .then(() => {
                        return res.send({
                            success: true,
                            message: "Type added!"
                        });
                    })
                    .catch((err) => {
                        return res.send({
                            success: false,
                            message: "Error: internal error"
                        });
                    });
            });
    });
});

router.route('/return').get((req, res) => {
    const {query} = req;
    const {token} = query;

    UserSession.find({
        _id: token,
        isDeleted: false
    }, (err, sessions) => {
        const session = sessions[0];
        User.findById(session.userId)
            .then(user => {
                return res.send({
                    sucess: true,
                    message: "all types",
                    types: user.types
                });
            })
            .catch((err) => {
                return res.send({
                    success: false,
                    message: "Error: Could not find user"
                });
            });
    });
});

router.route('/remove/:type').delete((req, res) => {
    const typeName = req.params.type;
    const {query} = req;
    const {token} = query;
    UserSession.find({
        _id: token,
        isDeleted: false
    }, (err, sessions) => {
        const session = sessions[0];
        User.updateOne({
            _id: session.userId
        }, {
            $pull : {types: {"name" : typeName }}
        }).then( () => {            
            return res.send({
                success: true,
                message: "Type was deleted"
            });
        }).catch((err) => {
            return res.send({
                success: false,
                message: "Error: " + err
            });
        });
    });
});

router.route('/remove_all').delete((req, res) => {
    const {query} = req;
    const {token} = query;

    UserSession.find({
        _id: token,
        isDeleted: false
    }, (err, sessions) => {
        if(err) {
            return res.send({
                success: false,
                message: "Error: internal error"
            });
        }
        if(sessions.length !== 1) {
            return res.send({
                success: false,
                message: "Error: incorrect token, no session found"
            });
        }
        const session = sessions[0];
        User.update({
            _id: session.userId
        }, {
            $pull : {types: {}}
        }).then(() => {
            return res.send({
                success: true,
                message: "All types deleted"
            });
        }).catch((err) => {
            return res.send({
                success: false,
                message: "Error: " + err
            });
        });
    });
});

module.exports = router;
