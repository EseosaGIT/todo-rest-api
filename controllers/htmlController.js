var _ = require('underscore');
var todos = [];
var todoID = 1;

module.exports = function (app, db) {
        app.get('/', function(req, res){
        res.send('Yo it is my TOdo app here');
    });

    // GET /todos  all todos also filters via query parameters /todos?completed=true 
    // also filters via advanced query parameters /todos?completed=true&q=work
    app.get('/todos', function (req, res) {
        // need to convert todo collection to JSON.
        var query = req.query; // query is gonna be a string
        var where = {}

        if (query.hasOwnProperty('completed')){ // query has completed as part of its properties
            if (query.completed === 'true') { // if that completed is true, we wanna retrieve true todos
                where.completed = true;
            } else if (query.completed === 'false') { // if that completed is false, we wanna retrieve false todos
                where.completed = false;
            }            
        }
        if (query.hasOwnProperty('q')){ // query has q as part of its properties. for extra query of searching the description
            if (query.q.length > 0) {
                where.description = {
                    $like: '%'+query.q+'%'
                };
            }   
        }
        
        db.todo_model.findAll({
            where: where // where can be null, when there's no query, it simply returns all 
        }).then(function(todos){
            if(todos.length>0){
                res.json(todos);
            } else {
                res.status(404).send('no todo with such query found');
            }
        }).catch(function(e){
            res.status(500).send('Server error');
        });
       
    });

    // GET /todos/:id  specific todo
    app.get('/todos/:id', function (req, res) {
        var todoID = parseInt(req.params.id, 10);
        var todoMatch = null;

        db.todo_model.findById(todoID).then(function(todo){
            if (todo){  // if a todo item was found
                res.json(todo); // so send the json format of the found object
            } else {
                console.log('wasnt found');
                res.status(404).send('Todo not found');
            }
            
        }).catch(function(e){
            console.log(e);
            res.status(500).send('Server error');
        });
    });


    // POST for allowing users send data (todo item) to us
    // POST /todos  
    app.post('/todos', function (req, res) {
        var jsonBody = req.body;

        jsonBody = _.pick(jsonBody, 'description', 'completed');

        if(!_.isBoolean(jsonBody.completed) || !_.isString(jsonBody.description) || jsonBody.description.trim().length === 0)
            return res.status(400).send('Wrong values POSTed');

        jsonBody.description = jsonBody.description.trim();

        db.todo_model.create({
            description: jsonBody.description,
            completed: jsonBody.completed
        }).then(function(todo){
            if (todo){
                console.log('successfully inserted');
                res.json(todo);
            }                
            else{
                console.log('not successful');
            }
        }).catch(function (e){
            console.log('error!!');
        })
    });



     // DELETE /todos:id deletes a particular todo item
    app.delete('/todos/:id', function (req, res) {
        var todoID = parseInt(req.params.id, 10); // grabs the passed in id for deletion
        var todoMatch = null; // todo to be deleted

        todoMatch = _.findWhere(todos, {id: todoID}); // gets the particular account

        if (!todoMatch)
            return res.status(404).send('todo to be deleted not found');

        todos = _.without(todos, todoMatch); // removes the todoMatch from the todos array
        console.log('delete');
        console.log(todoMatch);
        console.log(todos);

        res.json(todoMatch);
    });


    // PUT /todos:id updates a particular todo item
    app.put('/todos/:id', function (req, res) {
        var todoID = parseInt(req.params.id, 10);
        var body = _.pick(req.body, 'description', 'completed'); // getting only objects with these properties
        var todoMatch = _.findWhere(todos, {id: todoID});
        var validAttributes = {};

        console.log('body now is ');
        console.log(body);

        if (!todoMatch)
            return res.status(404).send('todo to be updated not found');    

        // for the completed part
        if (body.hasOwnProperty('completed') && _.isBoolean(body.completed)) { // if true it means it exists and its also a boolean - what we want
            validAttributes.completed = body.completed;
            console.log('set new completed to '+validAttributes.completed);
        } else if (body.hasOwnProperty('completed')){ // exist but not a boolean
            return res.status(400).send('cannot complete request because completed is not a boolean');
        }

        // for the description part
        if (body.hasOwnProperty('description') && _.isString(body.description) && body.description.trim().length > 0) { // if true it means it exists and its also a string and its length is > 0 - what we want
            validAttributes.description = body.description;
        } else if (body.hasOwnProperty('description')){ // exist but not a string or length <= 0
            return res.status(400).send('cannot complete request because description is not a string or length is <= 0');
        }

        _.extend(todoMatch, validAttributes); // this copies the content of the validAttributes object into the todoMatch (if they exist is simply just updates them)
        // we dont have to explicitly update the todos again because the todoMatch is passed by. specific todoMatch from the todos is automatically updated 

        res.json(todoMatch);

    });

}