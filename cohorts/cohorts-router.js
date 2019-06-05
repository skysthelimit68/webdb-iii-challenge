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

router.get("/:id", validateCohortId, (req, res) => {
    res.status(200).json(req.body.cohort)
})


router.get("/:id/students", validateCohortId, (req, res) => {
    Cohorts.findCohortStudents(req.params.id)
    .then( students => {
        res.status(200).json(students)
    })
    .catch(error => {
        res.status(500).json(error)
    })
})

router.post("/", validateCohortData, (req, res) => {
    const newCohort = req.body
    Cohorts.add(newCohort)
        .then(cohort => {
            res.status(201).json(cohort);
        })
        .catch(error => {
            res.status(500).json(error)
        })
})

router.put("/:id",validateCohortId, validateCohortData, (req, res) => {
    const changes = req.body.name
    Cohorts.update(req.params.id, {name : changes}) 
        .then( cohort => {
            res.status(200).json(cohort)
        })
        .catch( error => {
            res.status(500).json(error)
        })
})

router.delete("/:id", validateCohortId, (req, res) => {
    Cohorts.remove(req.params.id)
    .then( count => {
        res.status(200).json(`${count} record has been removed`)
    })
    .catch(error => {
        res.status(500).json(error)
    })
})



//middleware
function validateCohortId(req, res, next) {
    Cohorts.findById(req.params.id)
    .then(cohort => {
        if(!cohort) {
            res.status(404).json({message : "cohort not found"})
        } else {
            req.body.cohort = cohort;            
            next();
        }
    })
    .catch(error => {
        res.status(500).json(error)
    })
} 

function validateCohortData(req, res, next) {
    if(req.body.name) {
        next();
    } else {
        res.status(500).json({message: "Please provide a name for the cohort"})
    }
}


module.exports = router;

