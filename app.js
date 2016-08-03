var express = require('express');
var app = express();
var htmlController = require('./controllers/htmlController');
var middleware = require('./middleware'); // all our middleware here
var db = require('./db');
var port = process.env.PORT || 3000;

app.use(middleware.jsonParser);

htmlController(app, db);

db.sequelize.sync().then(function () {
    app.listen(port, function(){
        console.log('server started on port '+port);
    })    
})

