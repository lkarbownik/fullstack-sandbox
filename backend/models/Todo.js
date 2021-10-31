const { Model, DataTypes } = require('sequelize')

class Todo extends Model {
  static initialize(sequelize) {
    return Todo.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        title: {
          type: DataTypes.STRING,
          allowNull: false,
          defaultValue: '',
        },
        done: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        dueDate: DataTypes.DATE,
      },
      { sequelize, modelName: 'Todo', tableName: 'todo', timestamps: false }
    )
  }

  static associate(models) {
    Todo.belongsTo(models.TodoList)
  }
}

module.exports = Todo
