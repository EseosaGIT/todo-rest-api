module.exports = function (app, todos) {
        app.get('/', function(req, res){
        res.send('Yo it is my TOdo app here');
    });

    // GET /todos  all todos
    app.get('/todos', function (req, res) {
        // need to convert todo collection to JSON.
        res.json(todos); // built in express
    });

    // GET /todos/:id  specific todo
    app.get('/todos/:id', function (req, res) {
        var todoID = parseInt(req.params.id, 10);
        var todoMatch = null;

        console.log('all todos'+todos);
        console.log('todoID '+todoID);
        todos.forEach(function(eachTodo){
            console.log('todoIDs '+eachTodo.id);
            if (todoID === eachTodo.id){
                todoMatch = eachTodo;
                console.log('todoIDs '+eachTodo.id);
            }
        });

        if (todoMatch === null){ // meaning it wasnt found
            res.status(404).send('Todo not found');
        } else { // it was found
            res.json(todoMatch); // so send the json format of the found object
        }
        // res.send('TODO with id '+req.params.id);
    });
}