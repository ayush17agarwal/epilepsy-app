const router = require('express').Router();
let Medicine = require('../models/medicine.model');
let UserSession = require('../models/userSession.model');
let User = require('../models/user.model');

router.route('/add').post((req, res) => {
    const token = req.body.token;
    const name = req.body.name;
    const dosage = Number(req.body.dosage);
    const dosageSuffix = req.body.dosageSuffix;
    const timesGiven = Number(req.body.timesGiven);
    const notes = req.body.notes;
    const rescueMed = Boolean(req.body.rescueMed);

    const medicine = new Medicine({
        name,
        dosage,
        dosageSuffix,
        timesGiven,
        notes,
        rescueMed
    });

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
                message: "Error: could not locate token"
            });
        }

        const session = sessions[0];
        User.findById(session.userId)
            .then(user => {
                user.medicines.push(medicine);
                user.save()
                    .then(() => {
                        return res.send({
                            success: true,
                            message: "Medicine added!"
                        });
                    })
                    .catch((err) => {
                        return res.send({
                            success: false,
                            message: "Error: " + err
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
                    success: true,
                    message: "all medicines",
                    medicines: user.medicines
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

router.route('/rescue').get((req, res) => {
    const {query} = req;
    const {token} = query;

    UserSession.find({
        _id: token,
        isDeleted: false,
    }, (err, sessions) => {
        if(err) {
            return res.send({
                success: false,
                message: "Error: " + err
            });
        }
        if(sessions.length !== 1) {
            return res.send({
                success: false,
                message: "Error: Incorrect token"
            });
        }
        const session = sessions[0];
        User.findById(session.userId)
            .then(user => {
                const rescues = [];
                const medicines = user.medicines

                medicines.forEach(medicine => {
                    if(medicine.rescueMed === true) {
                        rescues.push(medicine)
                    }
                });

                return res.send({
                    success: true,
                    resuces: rescues
                });
            })
            .catch((err) => {
                return res.send({
                    success: false,
                    message: "Error: " + err
                });
            });
    });
});

router.route('/remove/:medicine').delete((req, res) => {
    const medicineName = req.params.medicine;
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
            $pull : {medicines: {"name" : medicineName }}
        }).then( () => {            
            return res.send({
                success: true,
                message: "Medicine was deleted"
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
        User.updateOne({
            _id: session.userId
        }, {
            $pull : {medicines: {}}
        }).then(() => {
            return res.send({
                success: true,
                message: "All medicines deleted"
            });
        }).catch((err) => {
            return res.send({
                success: false,
                message: "Error: " + err
            });
        });
    });
});

// router.route('/').get((req, res) => {
//     Medicine.find()
//         .then(medicines => res.json(medicines))
//         .catch(err => res.status(400).json('Error: ' + err));
// });

// router.route('/add').post((req, res) => {
//     const name = req.body.name;
//     const dosage = req.body.dosage;
//     const dosageSuffix = req.body.dosageSuffix;
//     const timesGiven = req.body.timesGiven;
//     const notes = req.body.notes;
//     const newMedicine = new Medicine({ name, dosage, dosageSuffix, timesGiven, notes });

//     newMedicine.save()
//         .then(() => res.json('Med added!'))
//         .catch(err => res.status(400).json('Error: ' + err));
// });

// router.route('/remove/:id').delete((req, res) => {
//     Medicine.findByIdAndDelete(req.params.id)
//         .then(() => res.json('Med Deleted!'))
//         .catch(err => res.status(400).json('Error: ' + err));
// });

// router.route('/remove').delete((req, res) => {
//     Medicine.deleteMany({})
//         .then(() => res.json('All Medicines Deleted!'))
//         .catch(err => res.status(400).json('Error: ' + err));
// });

module.exports = router;
