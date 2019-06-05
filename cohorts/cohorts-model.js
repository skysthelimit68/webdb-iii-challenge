const knex = require('knex');
const knexConfig = require('../knexfile.js');

const db = knex(knexConfig.development);

module.exports = {
    find, // get all cohorts
    //findById, // get cohort by id
    //findCohortStudents, // get students of a single cohort
   // add, // add cohort
   // update, // make change to cohort
   // remove // delete cohort
}

function find() {
    return db('cohorts')
}

