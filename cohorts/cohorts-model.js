const knex = require('knex');
const knexConfig = require('../knexfile.js');

const db = knex(knexConfig.development);

module.exports = {
    find, // get all cohorts
    findById, // get cohort by id
    findCohortStudents, // get students of a single cohort
    add, // add cohort
    update, // make change to cohort
    remove // delete cohort
}

function find() {
    return db('cohorts')
}

function findById(id) {
    return db('cohorts')
    .where( { id })
    .first()
}

function add(cohort) {
    return db('cohorts')
    .insert(cohort, 'id')
    .then( ids => {
        const [id] = ids;
        return findById(id)
    })
}

function update(id, changes) {
    return db('cohorts')
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
    return db('cohorts')
    .where({ id })
    .del()
}

function findCohortStudents(id) {
    return db('students')
    .where({ 'cohort_id': id })
}

