'use strict'

module.exports = {
  up: async (queryInterface) => {
    return queryInterface.bulkInsert('todo_list', [
      { title: 'First List' },
      { title: 'Second List' },
    ])
  },

  down: async (queryInterface) => {
    return queryInterface.bulkDelete('todo_list')
  },
}
