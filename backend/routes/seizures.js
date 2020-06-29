// const router = require('express').Router();
// let db = require('../models');

// router.route('/').get((req, res) => {
//     db.Seizure.find()
//         .then(seizures => res.json(seizures))
//         .catch(err => res.status(400).json('Error: ' + err));
// });

// router.route('/add').post((req, res) => {
//     const type = req.body.type;
//     const medicine = req.body.medicine;
//     const date = Date.parse(req.body.date);
//     const duration = req.body.duration;
//     const note = req.body.note;
//     const newSeizure = new Seizure({ type, medicine, date, duration, note});

//     newSeizure.save()
//         .then(() => res.json('Seizure added!'))
//         .catch(err => res.status(400).json('Error: ' + err));
// });

// module.exports = router;
