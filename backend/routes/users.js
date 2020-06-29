const router = require('express').Router();
let User = require('../models/user.model');
let UserSession = require('../models/userSession.model');

router.route('/name').get((req, res) => {
    const { query } = req;
    const { token } = query;

    UserSession.find({
        _id: token,
        isDeleted: false
    }, (err, session) => {
        const { userId } = session;
        User.find({
            _id: userId,
        }, (error, user) => {
            if (user.length != 1) {
                return res.send({
                    success: false,
                    message: 'Not able to find User',
                    name: null
                });
            } else {
                return res.send({
                    success: true,
                    message: 'Success',
                    name: user.name
                })
            }
        })
    })
});

// // router.route('/').get((req, res) => {
// //     User.find()
// //         .then(users => res.json(users))
// //         .catch(err => res.status(400).json('Error: ' + err));
// // });

// router.route('/add_type/:id').post((req, res) => {
//     const name = req.body.name;
//     const description = req.body.description;
//     const newType = new Type({ name, description });

//     newType.save();
//     User.findById(req.params.id)
//         .then(user => {
//             user.types.push(newType);
//             user.save()
//                 .then(() => res.json("User updated!"))
//                 .catch((err) => res.status(400).json('Error: ' + err));
//         })
//         .catch((err) => res.status(400).json('Error: ' + err));
// });

// router.route('/types/:id').get((req, res) => {
//     User.findById(req.params.id)
//         .then(user => res.json(user.types))
//         .catch((err) => res.status(400).json('Error: ' + err));
// });


// router.route('/:userid/remove_type/:typeid').delete((req, res) => {
//     // User.findById(userid)
//     //     .then(user => {
//     //         user.types.id(req.params.typeid).remove()
//     //             .then(() => res.json("Type Removed from User"))
//     //             .catch((err) => res.status(400).json('Error: ' + err));
//     //     });
//     const user = User.findById(req.params.userid);
//     user.update({},
//         { $pull: { types: { "_id": req.params.typeid } } }, false, false);
// });

// router.route('/remove').delete((req, res) => {
//     Medicine.deleteMany({})
//         .then(() => res.json('All Medicines Deleted!'))
//         .catch(err => res.status(400).json('Error: ' + err));
// });

module.exports = router;
