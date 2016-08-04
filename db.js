var Sequelize = require('Sequelize');
var env = process.env.NODE_ENV || 'development';
var sequelize;

if (env === 'production') { // environment variable for production
    sequelize = new Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres'
    })
} else {
        sequelize = new Sequelize(undefined, undefined, undefined, {
        'dialect': 'sqlite',
        'storage': __dirname + '/data/dev-todo-api.db'
    }); // creating an instance of Sequelize
}

var db = {};

db.todo_model = sequelize.import(__dirname + '/models/todo.js');
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
