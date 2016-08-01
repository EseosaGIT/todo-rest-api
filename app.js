var express = require('express');
var app = express();
var htmlController = require('./controllers/htmlController');
var port = process.env.PORT || 3000;

var todos = [{
    id: 1,
    description: 'Meet babe for lunch',
    completed: false
},
{
    id: 2,
    description: 'Go to market',
    completed: false
},
{
    id: 3,
    description: 'Finish NodeJS course',
    completed: true
}];

htmlController(app, todos);

app.listen(port, function(){
    console.log('server started on port '+port);
})