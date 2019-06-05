const router = require('express').Router();
const Students = require('./students-model.js');

router.get('/', (req, res) => {
    Students.find()
    .then( students => {
        res.status(200).json(students)
    })
    .catch(error => {
        res.status(500).json(error)
    })
})


router.get("/:id", validateStudentId, (req, res) => {
    res.status(200).json(req.body.student)
})

router.post("/", validateStudentData, (req, res) => {
    const newStudent = req.body
    Students.add(newStudent)
        .then(student => {
            res.status(201).json(student);
        })
        .catch(error => {
            res.status(500).json(error)
        })
})

router.put("/:id",validateStudentId, validateStudentData, (req, res) => {
    const changes = req.body.name
    Students.update(req.params.id, {name : changes}) 
        .then( student => {
            res.status(200).json(student)
        })
        .catch( error => {
            res.status(500).json(error)
        })
})

router.delete("/:id", validateStudentId, (req, res) => {
    Students.remove(req.params.id)
    .then( count => {
        res.status(200).json(`${count} record has been removed`)
    })
    .catch(error => {
        res.status(500).json(error)
    })
})



//middleware
function validateStudentId(req, res, next) {
    Students.findById(req.params.id)
    .then(student => {
        if(!student) {
            res.status(404).json({message : "student not found"})
        } else {
            req.body.student = student;            
            next();
        }
    })
    .catch(error => {
        res.status(500).json(error)
    })
} 

function validateStudentData(req, res, next) {
    if(req.body.name) {
        next();
    } else {
        res.status(500).json({message: "Please provide a name for the student"})
    }
}



module.exports = router;