const router = require('express').Router();
const Cohorts = require('./cohorts-model.js');

router.get("/", (req, res) => {
    Cohorts.find()
    .then(cohorts => {
        res.status(200).json(cohorts)
    })
    .catch(error => {
        res.status(500).json(error)
    })
})

module.exports = router;

