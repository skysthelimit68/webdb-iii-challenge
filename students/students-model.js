const knex = require('knex');

const knexConfig = require('../knexfile.js');

const db = knex(knexConfig.development);

module.exports = {
    find, // get all students
    findById, // get student by id
    add, // add student
    update, // make change to student by id
    remove // delete student by id
}

function find() {
    return db('students')
}

function findById(id) {
    return db
    .select('students.id', 'students.name', 'cohorts.name as cohort')
    .from('students')
    .innerJoin('cohorts', 'students.cohort_id', 'cohorts.id')
    .where({ 'students.id' : id})
    .first()
    
    /*return db.select('students.id', 'students.name', 'cohorts.name')
    .from('students')
    .innerJoin('cohorts', function() {
        this.on('students.cohort_id', '=', 'cohorts.id')
    })
    .where({ student.id: id })*/
    /*
    return db('students')
    .where( { id })
    .first()
    */
    /*
    return db.select(['students.id', 'students.name', 'cohorts.name'])
    .from('students')
    .innerJoin('cohorts', 'cohorts.id', 'students.cohort_id')
    .where('student.id', id)
    */
    /*
    return db('students')
    .innerJoin('cohorts', 'students.cohort_id', 'cohorts.id')
    .select('students.id', 'students.name', 'cohorts.name')
    .where('students.id', id)
    */
    /*select s.id, s.name, c.name
    from students as s
    innerjoin cohorts as c
    on s.cohort_id = c.id
    where s.id = id
*/

}

function add(student) {
    return db('students')
    .insert(student, 'id')
    .then( ids => {
        const [id] = ids;
        return findById(id)
    })
}

function update(id, changes) {
    return db('students')
    .where({ id })
    .update(changes)
    .then( count => {
        if(count > 0) {
            return findById(id)
        } else {
            return null;
        }
    })
}

function remove(id) {
    return db('students')
    .where({ id })
    .del()
}


