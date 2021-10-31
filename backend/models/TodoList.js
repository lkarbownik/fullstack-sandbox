const { Model, DataTypes } = require('sequelize')

class TodoList extends Model {
  static initialize(sequelize) {
    return TodoList.init(
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
      },
      {
        sequelize,
        modelName: 'TodoList',
        tableName: 'todo_list',
        timestamps: false,
      }
    )
  }

  static associate(models) {
    TodoList.hasMany(models.Todo)
  }
}

module.exports = TodoList
