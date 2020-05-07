const router = require('express').Router();
let Medicine = require('../models/medicine.model');

router.route('/').get((req, res) => {
    Medicine.find()
        .then(medicines => res.json(medicines))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const name = req.body.name;
    const dosage = req.body.dosage;
    const dosageSuffix = req.body.dosageSuffix;
    const timesGiven = req.body.timesGiven;
    const notes = req.body.notes;
    const newMedicine = new Medicine({name, dosage, dosageSuffix, timesGiven, notes});

    newMedicine.save()
        .then(() => res.json('Med added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/remove/:id').delete((req, res) => {
    Medicine.findByIdAndDelete(req.params.id)
        .then(() => res.json('Med Deleted!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/remove').delete((req, res) => {
    Medicine.deleteMany({})
        .then(() => res.json('All Medicines Deleted!'))
        .catch(err => res.status(400).json('Error: ' + err));
})
module.exports = router;
