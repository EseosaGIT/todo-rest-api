var Sequelize = require('Sequelize');
var sequelize = new Sequelize(undefined, undefined, undefined, {
    'dialect': 'sqlite',
    'storage': __dirname + '/sqlite-playground.db'
}); // creating an instance of Sequelize

var Todo = sequelize.define('todo', {
    description: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [1, 250] // to create a todo, it has to exist and not an empty string (1 - 250)
        }
    },
    completed: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
})

// sequelize let us manage data as objects and arrays and converts it native sql 
sequelize.sync().then(function(){
    console.log('everythin is sync'); // calling sync takes model and creates something that looks like it

    Todo.findById(44).then(function(todo){
        if (todo){
            console.log(todo.toJSON());
            console.log(todo.description);
            console.log(todo.completed);
        } else {
            console.log('todo not found');
        }
        console.log(todo);

        
    }).catch(function(e){
        console.log('there was an error');
    })


    // Todo.create({
    //     description: 'Play guitar'
    // }).then(function(todo){
    //     return Todo.create({
    //         description: 'Watch Movie',
    //         completed:true
    //     }).then(function(){
    //         // return Todo.findById(2)
    //         return Todo.findAll({
    //             where: {
    //                 completed: true,
    //                 description: {
    //                     $like: "%ovie%"
    //                 }
    //             }
    //         }
    //         ).then(function(todos){
    //             if (todos){ // todo item found
    //                 console.log('todo item found');
    //                 todos.forEach(function(todo){
    //                     console.log(todo.toJSON());
    //                 });
    //             } else  
    //                 console.log('todo item not found');
    //         })
    //     })
    // }).catch(function(e){
    //     console.log(e);
    // })
})


// the force: true automatically drops all the tables and recreates them
// sequelize.sync({force: true}).then(function(){
//     console.log('everythin is sync'); // calling sync takes model and creates something that looks like it
// })