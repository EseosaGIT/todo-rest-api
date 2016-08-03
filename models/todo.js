// this file we're importing must have this format we're using here
module.exports = function(sequelize, DataTypes) {  // an instance of sequelize and DataTypes used for defining model
    return sequelize.define('todo', {
        description: {
            type: DataTypes.STRING, //  DataTypes object has all the same data types that Sequelize has as well
            allowNull: false,
            validate: {
                len: [1, 250] // to create a todo, it has to exist and not an empty string (1 - 250)
            }
        },
        completed: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    });
}