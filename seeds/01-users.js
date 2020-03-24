
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'Leonardo', password: 'swords'},
        {username: 'Michelangelo', password: 'sewer'},
        {username: 'Donatello', password: 'pizza'},
        {username: 'Raphael', password: 'reporter'}
      ]);
    });
};
