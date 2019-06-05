
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students')
  .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {name: 'Sean', cohort_id: 1},
        {name: 'Juliet', cohort_id: 2},
        {name: 'Gus', cohort_id: 3}
      ]);
    });
};
