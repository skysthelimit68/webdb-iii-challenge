const knex = require('knex');

const knexConfig = require('../knexfile.js');

const db = knex(knexConfig.development);

module.exports = {
    find, // get all students
    //findById, // get student by id
   // add, // add student
   // update, // make change to student by id
   // remove // delete student by id
}

function find() {
    return db('students')
}


