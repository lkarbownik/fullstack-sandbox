'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.createTable('todo_list', {
        id: {
          type: Sequelize.DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        title: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
          defaultValue: '',
        },
      }),
      queryInterface.createTable('todo', {
        id: {
          type: Sequelize.DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        title: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
          defaultValue: '',
        },
        done: {
          type: Sequelize.DataTypes.BOOLEAN,
          defaultValue: false,
          allowNull: false,
        },
        dueDate: Sequelize.DataTypes.DATE,
        todoListId: {
          type: Sequelize.DataTypes.INTEGER,
          references: {
            model: {
              tableName: 'todo_list',
            },
            key: 'id',
          },
        },
      }),
    ])
  },

  down: async (queryInterface) => {
    return queryInterface.sequelize.transaction((transaction) => {
      return Promise.all([
        queryInterface.dropTable('todo', { transaction }),
        queryInterface.dropTable('todo-list', { transaction }),
      ])
    })
  },
}
