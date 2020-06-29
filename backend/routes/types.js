// const router = require('express').Router();
// let Type = require('../models/type.model');

// router.route('/').get((req, res) => {
//     Type.find()
//         .then(users => res.json(users))
//         .catch(err => res.status(400).json('Error: ' + err));
// });

// router.route('/add').post((req, res) => {
//     const name = req.body.name;
//     const description = req.body.description;
//     const newType = new Type({name, description});

//     newType.save()
//         .then(() => res.json('Type added!'))
//         .catch(err => res.status(400).json('Error: ' + err));
// });

// router.route('/remove/:id').delete((req, res) => {
//     Type.findByIdAndDelete(req.params.id)
//         .then(() => res.json('Type Deleted!'))
//         .catch(err => res.status(400).json('Error: ' + err));
// });

// router.route('/remove').delete((req, res) => {
//     Type.deleteMany({})
//         .then(() => res.json('All Types Deleted!'))
//         .catch(err => res.status(400).json('Error: ' + err));
// })
// module.exports = router;
